/*
 * Get the input required 
 * can not continue without getting the input 
 */
function(element, input) {
    let jobChoice = window.prompt('Type your job title');
    while (!jobChoice) {
        window.confirm('Job title is required');
        jobChoice = window.prompt('Type your job title');
    }
    return jobChoice;
}
