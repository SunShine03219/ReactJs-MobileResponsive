export const changeDate = (dateString) => {
    const dateObj = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObj.toLocaleString('en-US', options);
    return formattedDate
}


export const stripHtmlTags = (html) => {
    const regex = /(<([^>]+)>)/gi;
    return html.replace(regex, '');
}
