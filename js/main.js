document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    e.preventDefault();
    
    let siteName = document.getElementById('siteName').value;
    let siteURL = document.getElementById('siteURL').value;

    if(!validateForm(siteName, siteURL)) {
        return false;
    }

    let bookmark = {
        name: siteName,
        url: siteURL
    }

    if (localStorage.getItem('bookmarks') === null) {
        let bookmarks = [];

        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    document.getElementById('myForm').reset();

    fetchBookmarks();

};

function deleteBookmark(url) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
}

function fetchBookmarks() {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';

    for(let i = 0; i < bookmarks.length; i++) {
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well"'+
                                      '<h3>'+name+
                                      ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
                                      ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '+
                                      '</h3>'+
                                      '</div>';
    }
};

function validateForm(siteName, siteURL) {
    if(!siteName || !siteURL) {
        alert('Please fill in the form');
        return false;
    }

    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const regex = new RegExp(expression);

    if(!siteURL.match(regex)) {
        alert('Please use a valid URL')
        return false;
    }

    return true;
}