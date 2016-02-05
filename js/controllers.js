var mainControllers = angular.module('mainControllers', []);

mainControllers.controller('OverviewController', ['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll) {
    $anchorScroll();
}]);

mainControllers.controller('MPController', ['$scope', function($scope) {
    $scope.mps = [
        {
            "name" : "Pointers Gone Wild!",
            "releaseDate" : "Week 2",
            "dueDate" : "Week 3"
        },
        {
            "name" : "Vector",
            "releaseDate" : "Week 3",
            "dueDate" : "Week 4"
        },
        {
            "name" : "Text Editor",
            "releaseDate" : "Week 4",
            "dueDate" : "Week 5"
        },
        {
            "name" : "Shell",
            "releaseDate" : "Week 5",
            "dueDate" : "Week 6"
        },
        {
            "name" : "Malloc",
            "releaseDate" : "Week 6",
            "dueDate" : "Week 7 & 8"
        },
        {
            "name" : "Password Cracker",
            "releaseDate" : "Week 8",
            "dueDate" : "Week 9 & 10"
        },
        {
            "name" : "Parallel Make",
            "releaseDate" : "Week 10",
            "dueDate" : "Week 11 & 12"
        },
        {
            "name" : "Map Reduce",
            "releaseDate" : "Week 12",
            "dueDate" : "Week 13 & 14"
        },
        {
            "name" : "Wearables",
            "releaseDate" : "Week 14",
            "dueDate" : "Week 15"
        }
    ];
}]);

mainControllers.controller('LabController', ['$scope', function($scope) {

}]);

mainControllers.controller('HelpController', ['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll) {
    $anchorScroll();
}]);

mainControllers.controller('StaffController', ['$scope', '$http', function($scope, $http) {
  $http
    .get('./data/staff.txt',
        {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age=0'
          }
        }
      )
    .success(function(data) {
    $scope.staff = data;
  });
}]);

mainControllers.controller('ScheduleController', ['$scope', '$http', '$sce', '$location', '$anchorScroll', function($scope, $http, $sce, $location, $anchorScroll) {
  $http.get('./data/schedule_sp16.txt',  {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=10, no-cache, must-revalidate',
		 'pragma':'no-cache'
      }}
  ).success(function(data) {
    $scope.schedule = data;
    $scope.days = ["Monday", "Wednesday", "Friday"];
    $scope.dontEscapeHtml = function(html) {
      return $sce.trustAsHtml(html);
    };
    // Jump to current week
    $location.hash('currentWeek');
    $anchorScroll();
  });

}]);

mainControllers.controller('DevelopingController', ['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll) {
    $anchorScroll();
}]);

var labControllers = angular.module('labControllers', []);

labControllers.controller('ScheduleController', ['$scope', function($scope) {
    $scope.labs = [
        {
            "name" : "Know Your Tools",
            "releaseDate" : "Week 1",
            "dueDate" : "Week 2"
        },
        {
            "name" : "Extreme Edge Cases",
            "releaseDate" : "Week 2",
            "dueDate" : "Week 3"
        },
        {
            "name" : "Utilities Unleashed",
            "releaseDate" : "Week 3",
            "dueDate" : "Week 4"
        },
        {
            "name" : "Mini Valgrind",
            "releaseDate" : "Week 4",
            "dueDate" : "Week 5"
        },
        {
            "name" : "Terrible Tangled Twisted Threads",
            "releaseDate" : "Week 5",
            "dueDate" : "Week 6"
        },
        {
            "name" : "Two To Tango",
            "releaseDate" : "Week 6",
            "dueDate" : "Week 7"
        },
        {
            "name" : "Overworked Interns",
            "releaseDate" : "Week 7",
            "dueDate" : "Week 8"
        },
        {
            "name" : "Ideal Indirection",
            "releaseDate" : "Week 8",
            "dueDate" : "Week 9"
        },
        {
            "name" : "Mad Mad Access Pattern",
            "releaseDate" : "Week 9",
            "dueDate" : "Week 10"
        },
        {
            "name" : "Et tu, Brute?",
            "releaseDate" : "Week 10",
            "dueDate" : "Week 11"
        },
        {
            "name" : "Chatroom",
            "releaseDate" : "Week 11",
            "dueDate" : "Week 12"
        },
        {
            "name" : "Scheduler",
            "releaseDate" : "Week 12",
            "dueDate" : "Week 13"
        },
        {
            "name" : "Finding Files",
            "releaseDate" : "Week 13",
            "dueDate" : "Week 14"
        },
        {
            "name" : "Epoll Downloader",
            "releaseDate" : "Week 14",
            "dueDate" : "Week 15"
        },
    ];
}]);

labControllers.controller('LabController', ['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll) {
    $anchorScroll();
}]);
