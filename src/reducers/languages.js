export default function(selectedLanguage = null, action){
    if(action.type === 'changeLanguage') {
        return action.selectedLanguage
    } else {
        return selectedLanguage
    }
}