// // /**
// //  * Created by Dominika on 2017-05-21.
// //  */
// //
// angular.module('nikoApp').controller('ValidEmail', function ($scope, $resource, $http) {
//     var text = element(by.binding('email.text'));
//     var valid = element(by.binding('myForm.input.$valid'));
//     var input = element(by.model('email.text'));
//
//     it('should initialize to model', function() {
//         expect(text.getText()).toContain('me@example.com');
//         expect(valid.getText()).toContain('true');
//     });
//
//     it('should be invalid if empty', function() {
//         input.clear();
//         input.sendKeys('');
//         expect(text.getText()).toEqual('text =');
//         expect(valid.getText()).toContain('false');
//     });
//
//     it('should be invalid if not email', function() {
//         input.clear();
//         input.sendKeys('xxx');
//
//         expect(valid.getText()).toContain('false');
//     });
// });
