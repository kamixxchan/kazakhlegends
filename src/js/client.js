/**
 * @copyright codewithsadee 2023
 */

'use strict';

import { NavItem } from "./components/NavItem.js";
import { activeNotebook } from "./utils.js";
import { Card } from "./components/Card.js";

const $sidebarList = document.querySelector('[data-sidebar-list]');
const $notePanelTitle = document.querySelector('[data-note-panel-title]');
const $notePanel = document.querySelector('[data-note-panel]');
const $noteCreateBtns = document.querySelectorAll('[data-note-create-btn]');
const emptyNotesTemplate = `
<div class="empty-notes">
    <span class="material-symbols-rounded" aria-hidden="true">note_stack</span>

    <div class="text-headline-small">No notes</div>
</div>
`;

/**
 * 
 * @param {boolean} isThereAnyNotebook 
 */
const disableNoteCreateBtns = function (isThereAnyNotebook){
    $noteCreateBtns.forEach($item => {
        $item[isThereAnyNotebook ? 'removeAttribute' : 'setAttribite']('disabled', '');
    });
}

/**
 * @namespace
 * @property {Object} notebook
 * @property {Object} note
 */
export const client = {
    notebook:{
        /**
         * 
         * @param {Object} notebookData 
         */
        create(notebookData){
            const $navItem = NavItem(notebookData.id, notebookData.name);
            $sidebarList.appendChild($navItem);
            activeNotebook.call($navItem);
            $notePanelTitle.textContent = notebookData.name;
            $notePanel.innerHTML = emptyNotesTemplate;
            disableNoteCreateBtns(true);
        },

        /**
         * @param {Array<Object>} notebookList
         */
        read(notebookList){
            disableNoteCreateBtns(notebookList.length);
            notebookList.forEach((notebookData, index)=>{
                const $navItem = NavItem(notebookData.id, notebookData.name);

                if (index === 0){
                    activeNotebook.call($navItem);
                    $notePanelTitle.textContent = notebookData.name;
                }

                $sidebarList.appendChild($navItem);
            })
        },

        /**
         * 
         * @param {string} notebookId 
         * @param {Object} notebookData 
         */
        update(notebookId, notebookData){
            const $oldNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);
            const $newNotebook = NavItem(notebookData.id,notebookData.name);

            $notePanelTitle.textContent = notebookData.name;
            $sidebarList.replaceChild($newNotebook, $oldNotebook);
            activeNotebook.call($newNotebook);
        },


        /**
         * 
         * @param {string} notebookId 
         */
        delete(notebookId){
            const $deletedNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);
            const $activeNavItem = $deletedNotebook.nextElementSibling ?? $deletedNotebook.previousElementSibling;

            if($activeNavItem){
                $activeNavItem.click();
            }else{
                $notePanelTitle.innerHTML = '';
                $notePanel.innerHTML='';
                disableNoteCreateBtns(false);
            }
            
            $deletedNotebook.remove();
        }

    },

    note: {
        /**
         * @param {Object} noteData;
         */
        create(noteData){
            if ($notePanel.querySelector('[data-note]')) $notePanel.innerHTML = '';
            const $card = Card(noteData);
            $notePanel.appendChild($card);
        },
        /**
         * @param {Array<Object>} noteList
         */
        read(noteList){

            if (noteList.length){
                $notePanel.innerHTML = `
                `;

                noteList.forEach(noteData=>{
                    const $card = Card(noteData);
                    $notePanel.appendChild($card);
                });
            } else{
                $notePanel.innerHTML=emptyNotesTemplate;
            }
        },

        /**
         * 
         * @param {string} noteId 
         * @param {Object} noteData 
         */
        update(noteId, noteData){
            const $oldCard = document.querySelector(`[data-note="${noteId}"]`);
            const $newCard = Card(noteData);
            $notePanel.replaceChild($newCard, $oldCard);

        },


        /**
         * 
         * @param {string} noteId 
         * @param {boolean} isNoteExists 
         */
        delete(noteId, isNoteExists){
            document.querySelector(`[data-note="${noteId}"]`).remove();
            if (!isNoteExists) $notePanel.innerHTML = emptyNotesTemplate;
        }

    }
}