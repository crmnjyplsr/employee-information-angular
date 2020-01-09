myApp.factory('Authentication',
    ['$rootScope', '$firebaseAuth', '$firebaseObject',
        '$location', 'FIREBASE_URL',
        function ($rootScope, $firebaseAuth, $firebaseObject,
            $location, FIREBASE_URL) {

            var ref = new Firebase(FIREBASE_URL);
            var auth = $firebaseAuth(ref);

            auth.$onAuth(function (authUser) {
                if (authUser) {
                    var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
                    var userObj = $firebaseObject(userRef);
                    $rootScope.currentUser = userObj;
                } else {
                    $rootScope.currentUser = '';
                }
            });


            var myObject = {
                login: function (user) {
                    auth.$authWithPassword({
                        email: user.email,
                        password: user.password
                    }).then(function (regUser) {
                        $location.path('/success');
                    }).catch(function (error) {
                        $rootScope.message = error.message;
                    });
                }, //login

                logout: function () {
                    return auth.$unauth();
                }, //logout

                requireAuth: function () {
                    return auth.$requireAuth();
                }, //require Authentication

                //register: function (user) {
                //    auth.$createUser({
                //        email: user.email,
                //        password: user.password
                //    }).then(function (regUser) {

                //        var regRef = new Firebase(FIREBASE_URL + 'users')
                //            .child(regUser.uid).set({
                //                date: Firebase.ServerValue.TIMESTAMP,
                //                regUser: regUser.uid,
                //                firstname: user.firstname,
                //                lastname: user.lastname,
                //                email: user.email
                //            }); //user info

                //        myObject.login(user);

                //    }).catch(function (error) {
                //        $rootScope.message = error.message;
                //    }); // //createUser
                //} // register

                    adduser: function (user) {
                    auth.$createUser({
                        email: user.email,
                        password: user.password
                    }).then(function (regUser) {

                        var regRef = new Firebase(FIREBASE_URL + 'users')
                            .child(regUser.uid).set({
                                date: Firebase.ServerValue.TIMESTAMP,
                                regUser: regUser.uid,
                                employeestatus: user.employeestatus,
                                employeeid: user.employeeid,
                                sssnumber: user.sssnumber,
                                tinnumber: user.tinnumber,
                                username: user.username,
                                email: user.email,
                                password: user.password,
                                honorifics: user.honorifics,
                                firstname: user.firstname,
                                middlename: user.middlename,
                                lastname: user.lastname,
                                emergencyname: user.emergencyname,
                                emergencyaddress: user.emergencyaddress,
                                emergencycontact: user.emergencycontact

                            }); //user info

                        myObject.login(user);

                    }).catch(function (error) {
                        $rootScope.message = error.message;
                    }); // //createUser
                } // register
            };

            return myObject;
        }]); //factory