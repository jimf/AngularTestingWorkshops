/* global R:false, sanctuary:false */
(function (R, S) {
    'use-strict';

    angular.module('fizzbuzzService')
    .service('FizzbuzzService', FizzbuzzService);

    function FizzbuzzService($log) {
        var self = this;

        // divisibleBy :: Integer -> Integer -> Boolean
        var divisibleBy = R.curry(function(a, b) {
            return R.mathMod(b, a) === 0;
        });

        // notZeroAnd :: (Integer -> Boolean) -> Integer -> Boolean
        var notZeroAnd = R.curry(function(pred, x) {
            return x !== 0 && pred(x);
        });

        // carbonation :: (a -> b -> Boolean) -> String -> Maybe String
        var rule = R.curry(function(pred, result, value) {
            return pred(value) ? S.Just(result) : S.Nothing();
        });

        // mconcat :: [Maybe String] -> Maybe String
        var mconcat = R.reduce(R.concat, S.Maybe.empty());

        var rules = [
            rule(notZeroAnd(divisibleBy(3)), 'fizz'),
            rule(notZeroAnd(divisibleBy(5)), 'buzz'),
            rule(R.equals(0), '0 the hero'),
            rule(R.equals(-0), '0 the hero'),
            rule(isNaN, 'Whoops! Please pass a whole number into fizzbuzz!')
        ];

        // fizzbuzz :: Integer -> String
        function fizzbuzz(x) {
            return S.fromMaybe(String(x), mconcat(R.juxt(rules)(x)));
        }

        self.fizzbuzz = R.compose(
            fizzbuzz,
            Number,
            R.tap(function(input) {
                $log.log('fizzbuzz called with: ' + input + ' of type: ' + typeof input);
            })
        );

        $log.log('fizzbuzz service created.');
    }

})(R, sanctuary);
