/**
 * @copyright codewithsadee 2023
 */

'use strict';


/**
 * 
 * 
 * @param {Array<HTMLElement>} $elements
 * @param {string} eventType
 * @param {Function} callback
 */

const addEventOnElements = function ($elements, eventType, callback){
    $elements.forEach($element => $element.addEventListener(eventType, callback));
}


/**
 * 
 * 
 * @param {number} currentHour
 * @returns {string} 
 */
const getGreetingMsg = function(currentHour){
    const greeting = 
    currentHour < 5 ? 'Night' : 
    currentHour < 12 ? 'Morning':
    currentHour < 15 ? 'Noon' :
    currentHour < 17 ? 'Afternoon':
    currentHour < 20 ? 'Evening' : 
    'Night';

    return `Good ${greeting}`;
}

let $lastActiveNavItem;
const activeNotebook = function(){
    $lastActiveNavItem?.classList.remove('active');
    this.classList.add('active');
    $lastActiveNavItem = this;
}


/**
 * 
 * 
 * @param {HTMLElement} $element
 */
const makeElemEditable = function ($element){
    $element.setAttribute('contenteditable', true);
    $element.focus();
}

/**
 * @returns {string}
 */
const generateID = function(){
    return new Date().getTime().toString();
}



/**
 * 
 * @param {Object} db 
 * @param {string} notebookId 
 * @returns {Object|undefined}
 */
const findNotebook = function(db, notebookId){
    return db.notebooks.find(notebook => notebook.id === notebookId);
}


/**
 * 
 * @param {Object} db 
 * @param {string} notebookId 
 * @returns {number}
 */
const findNotebookIndex = function (db, notebookId){
    return db.notebooks.findIndex(item=> item.id === notebookId);
}


/**
 * 
 * @param {number} milliseconds 
 * @returns {string}
 */
const getRelativeTime = function(milliseconds){
    const currentTime = new Date().getTime();

    let minute = Math.floor((currentTime-milliseconds)/1000/60);
    const hour = Math.floor(minute/60);
    const day = Math.floor(hour/24);

    return minute < 1 ? 'Just now' : minute<60 ? `${minute} min ago` : hour < 24 ? `${hour} hour ago` : `${day} day ago`;
}


/**
 * 
 * @param {Object} db 
 * @param {string} noteId 
 * @returns {Object | undefined}
 */
const findNote = (db, noteId)=>{
    let note;
    for (const notebook of db.notebooks){
        note = notebook.notes.find(note=>note.id===noteId);
        if (note) break;
    }
    return note;
}

/**
 * 
 * @param {Object} notebook 
 * @param {string} noteId 
 * @returns {number}
 */
const findNoteIndex = function (notebook, noteId){
    return notebook.notes.findIndex(note=>note.id===noteId);
}

export{
    addEventOnElements,
    getGreetingMsg,
    activeNotebook,
    makeElemEditable,
    generateID,
    findNotebook,
    findNotebookIndex,
    getRelativeTime,
    findNote, 
    findNoteIndex
}