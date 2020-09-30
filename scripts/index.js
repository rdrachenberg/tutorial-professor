
// jQuery document ready function 
$(document).ready(function () {
    console.log('doc ready hit!');
    

    function checkUser(check, messageErr, messageSuccess, element) {
        if (check) {
            $(element).notify(messageErr, {
                className:'error',
                position: 'bottom left',
                autoHideDelay: 3000,
                
            });
            $('#register-button').on('hover', () => {
                $(this).prop('disabled', true);
            });
        } else {
            $(element).notify(messageSuccess, {
                className: 'success',
                position: 'top left',
                autoHideDelay: 3000,
            });
        }
    }
    $('#register-username').on('change', (result) => {
        let registerUsername = document.getElementById('register-username').value;
        // console.log(result);
        checkUser(registerUsername.length < 5, 'Username Must Be 5 Characters or Longer', 'Username meets requirements', '#register-username');
        
    }); 
    $('#register-password').on('change', (result) => {
        let registerPassword = document.getElementById('register-password').value;
        // console.log(result);
        checkUser(registerPassword.length < 5, 'Password Must Be 5 Characters or Longer', 'Password meets requirements', '#register-password')
        
    });
    
    $('#register-repeat-password').on('change', (result) => {
        let registerPassword = document.getElementById('register-password').value;
        let registerRepeatPassword = document.getElementById('register-repeat-password').value;
        // console.log(registerPassword);
        // console.log(registerRepeatPassword);

        if (registerRepeatPassword != null && registerRepeatPassword != '') {
            checkUser(registerRepeatPassword != registerPassword, 'Passwords Must Match', 'Passwords match', '#register-repeat-password');
        }
    });
    $('#register-password').on('change', (result) => {
        let registerPassword = document.getElementById('register-password').value;
        let registerRepeatPassword = document.getElementById('register-repeat-password').value;
        // console.log(registerPassword);
        // console.log(registerRepeatPassword);

        if (registerPassword != null && registerPassword != '') {
            checkUser(registerRepeatPassword != registerPassword, 'Passwords Must Match', 'Passwords match', '#register-repeat-password');
        }
    });

    $('#login-username').on('change', (result) => {
        let loginUsername = document.getElementById('login-username').value;
        // console.log(result);
        checkUser(loginUsername.length < 5, 'Username Must Be 5 Characters or Longer', 'Username Meets Requirements', '#login-username');
        
    }); 
    $('#login-password').on('change', (result) => {
        let loginPassword = document.getElementById('login-password').value;
        // console.log(result);
        checkUser(loginPassword.length < 5, 'Password Must Be 5 Characters or Longer', 'Password meets requirements', '#login-password');
        
    }); 
    $('#create-title').on('change', (result) => {
        let createTitle = document.getElementById('create-title').value;
        // console.log(result);
        checkUser(createTitle.length < 2, 'Must Have a Title', 'Title meets requirements', '#create-title');
        
    }); 
    $('#create-description').on('change', (result) => {
        let createDescription = document.getElementById('create-description').value;
        // console.log(result);
        checkUser(createDescription.length < 2 || createDescription.length > 50, 'Details Required & Less Than 50 Characters', 'Description meets requirements', '#create-description');
        
    }); 
    $('#create-imageUrl').on('change', (result) => {
        let createDescription = document.getElementById('create-imageUrl').value;
        // console.log(result);
        checkUser(createDescription == /^((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif|bmp)$/, 'Valid Image Url Required', 'Image meets requirements', '#create-imageUrl');
        
    });

    $('#register-button').on('click', () => {
        console.log('register button hit');
        $.notify('Registration Successful', 'success');
    });
    $('#logout-button').on('click', () => {
        console.log('logout button hit');
        $.notify('Logout Successful', 'success');
    });
    $('#login-button').on('click', () => {
        console.log('login button hit');
        $.notify('Login Successful', 'success');
    });
    $('#logout').on('click', () => {
        console.log('logout button hit');
        $.notify('Logout Successful', 'success');
    });
    $('#delete-button').on('click', () => {
        console.log('delete button hit');
        $.notify('deleting record...', 'success');
        
    });
    $('#create-button').on('click', () => {
        console.log('create course button hit');
        $.notify('creating course info', 'success');
    });
});