describe('Fizzbuzz Service', function() {
    'use strict';

    var fizzbuzzService;

    beforeEach(module('fizzbuzzService'));
    beforeEach(module('fizzbuzzService', function($provide) {
        $provide.value(console);
    }));

    beforeEach(inject(function(FizzbuzzService) {
        fizzbuzzService = FizzbuzzService;
    }));

    [
        { input: 3, expected: 'fizz', testing: 'divisible by 3' },
        { input: 5, expected: 'buzz', testing: 'divisible by 5' },
        { input: 15, expected: 'fizzbuzz', testing: 'divisible by both 3 and 5' },
        { input: 8, expected: '8', testing: 'divisible by neither 3 nor 5' },
        {
            input: 'junk',
            expected: 'Whoops! Please pass a whole number into fizzbuzz!',
            testing: 'input is not a number'
        },
        { input: 0, expected: '0 the hero', testing: 'special 0 case' },
        { input: -3, expected: 'fizz', testing: 'negative and divisible by 3' },
        { input: -5, expected: 'buzz', testing: 'negative and divisible by 5' },
        { input: -15, expected: 'fizzbuzz', testing: 'negative and divisible by both 3 and 5' },
        { input: -8, expected: '-8', testing: 'negative and divisible by neither 3 nor 5' },
        { input: -0, expected: '0 the hero', testing: 'special -0 case' }
    ].forEach(function(test) {
        it('should return expected result when input is ' + test.testing, function() {
            expect(fizzbuzzService.fizzbuzz(test.input)).toBe(test.expected);
        });

        it('should return expected result when input is a string and ' + test.testing, function() {
            expect(fizzbuzzService.fizzbuzz(String(test.input))).toBe(test.expected);
        });
    });
});
