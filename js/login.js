document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    
    // Check if user is already logged in
    if (sessionStorage.getItem('studentName') && sessionStorage.getItem('studentUID')) {
        // Enable navigation links
        enableNavLinks();
    }
    
    loginBtn.addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const uid = document.getElementById('uid').value;
        
        if (name && uid) {
            // Store user info in session storage
            sessionStorage.setItem('studentName', name);
            sessionStorage.setItem('studentUID', uid);
            sessionStorage.setItem('isLoggedIn', 'true');
            
            // Enable navigation links
            enableNavLinks();
            
            // Redirect to attendance page
            window.location.href = 'attendance.html';
        } else {
            alert('Please enter both Name and UID');
        }
    });
    
    function enableNavLinks() {
        // Remove disabled class from navigation links
        document.querySelectorAll('nav ul li.disabled').forEach(function(item) {
            item.classList.remove('disabled');
        });
    }
});