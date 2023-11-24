/**
 * @copyright codewithsadee 2023
 */

'use strict';


/**
 * Modulue import
 */

import { addEventOnElements, getGreetingMsg, activeNotebook, makeElemEditable } from "./utils.js";
import { Tooltip } from "./components/Tooltip.js";
import { db } from "./db.js";
import { client } from "./client.js";
import { NoteModal } from "./components/Modal.js";

/**
 * Toggle sidebar in small screen
 */

const /**{HTMLElement} */ $sidebar = document.querySelector('[data-sidebar]');
const /**{Array<HTMLElement>} */ $sidebarTogglers = document.querySelectorAll('[data-sidebar-toggler]');
const /**{HTMLElement} */ $overlay=document.querySelector('[data-sidebar-overlay]');

addEventOnElements($sidebarTogglers, 'click', function(){
    $sidebar.classList.toggle('active');
    $overlay.classList.toggle('active');
});


const $tooltipElems = document.querySelectorAll('[data-tooltip]');
$tooltipElems.forEach($elem => Tooltip($elem));


/**
 * show greeting mes
 */

const $greetElem = document.querySelector('[data-greeting]');
const currentHour = new Date().getHours();
$greetElem.textContent = getGreetingMsg(currentHour);


/**
 * data!!
 */

const $currentDateElem = document.querySelector('[data-current-date]');
$currentDateElem.textContent = new Date().toDateString().replace(' ', ', ');

/**
 * create
 */

const $sidebarList = document.querySelector('[data-sidebar-list]');
const $addNotebookBtn = document.querySelector('[data-add-notebook]');

const showNotebookField = function(){
    const $navItem = document.createElement('div');
    $navItem.classList.add('nav-item');

    $navItem.innerHTML = `
        <span class = "text text-label-large" data-notebook-field></span>

        <div class = "state-layer"></div>
    `;

    $sidebarList.appendChild($navItem);

    const $navItemField = $navItem.querySelector('[data-notebook-field]');

    activeNotebook.call($navItem);

    makeElemEditable($navItemField);

    $navItemField.addEventListener('keydown', createNotebook);
}

$addNotebookBtn.addEventListener('click', showNotebookField);

const createNotebook = function (event){
    if (event.key==='Enter'){
        
        const notebookData = db.post.notebook(this.textContent || 'Untitled');
        this.parentElement.remove();

        client.notebook.create(notebookData);


    }
}


const renderExistedNotebook = function(){
    const notebookList = db.get.notebook();
    client.notebook.read(notebookList);
}

renderExistedNotebook();









const $noteCreateBtns = document.querySelectorAll('[data-note-create-btn]');

addEventOnElements($noteCreateBtns, 'click', function(){
    const modal = NoteModal();
    modal.open();

    modal.onSubmit(noteObj=>{
        const activeNotebookId = document.querySelector('[data-notebook].active').dataset.notebook;

        // console.log(noteObj);
        // console.log(activeNotebookId);

        const noteData = db.post.note(activeNotebookId, noteObj);

        client.note.create(noteData);
        modal.close();
    })
});



const renderExisted = function(){
    const activeNotebookId = document.querySelector('[data-notebook].active')?.dataset.notebook;
    if(activeNotebookId){
        const noteList = db.get.note(activeNotebookId);
        

        client.note.read(noteList);
    }
}

renderExisted();