import angular from 'angular';

interface MockRepoOptions {
  reloadMethods: [];
}

export function mockRepository(
  methods,
  options: MockRepoOptions = { reloadMethods: [] }
) {
  function MockRepository($q, $rootScope) {
    this.result = $q.defer();
    this.$scope = $rootScope;

    const self = this;
    methods.each(method => {
      self[method] = self[method].bind(self);
      // @ts-ignore
      spyOn(self, method).and.callThrough();
    });
  }

  MockRepository.prototype = {
    respondWith(result) {
      this.result.resolve(result);
      this.$scope.$apply();
    },
    failWith(result) {
      this.result.reject(result);
      this.$scope.$apply();
    },
  };

  methods.each(method => {
    MockRepository.prototype[method] = function() {
      return this.result.promise;
    };
  });

  options.reloadMethods.forEach(method => {
    MockRepository.prototype[method] = function() {
      const lastArgument = (Array as any).prototype.last.apply(arguments);
      return this.result.promise.then(object => {
        angular.copy(object, lastArgument);
      });
    };
  });

  return MockRepository;
}
