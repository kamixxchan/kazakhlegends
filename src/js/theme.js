/**
 * @copyright codewithsadee 2023
 */

'use strict';


const toggleTheme=function(){
    const currentTheme =document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark': 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
}

/**
 * Initialize the theme
 */

const /**{string | undefined} */ storedTheme=localStorage.getItem('theme');
const /**{boolean} */ systemThemeIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const /**{string} */ initialTheme=storedTheme ?? (systemThemeIsDark ? 'dark': 'light');
document.documentElement.setAttribute('data-theme', initialTheme);


/**
 * 
 */
window.addEventListener('DOMContentLoaded', function(){
    const /**{HTMLElement} */ $themeBtn=this.document.querySelector('[data-theme-btn]');
    if ($themeBtn) $themeBtn.addEventListener('click', toggleTheme);
});