angular.module('seriesApp').controller('seriesController', function($scope,$http) {

	$scope.series = [];
	$scope.watchListSeries = [];
	$scope.profileSeries = [];

	$scope.search = false;
	$scope.profile = true;
	$scope.watchList = false;

	$scope.getSeries = function(name) {
		var promise = $http.get('https://omdbapi.com/?s=' + name + '&type=series&apikey=93330d3c').then(function(response) {
			$scope.series = response.data.Search;
			$scope.searchState = response.data;
			if ($scope.searchState.Response == "False") {
				alert("Serie not found!");
			}
		}, function error(error) {
			console.log(error);
		})
		$scope.showSearchedSeries = true;

		return promise;
	};


	$scope.addProfileSerie = function(name) {
		if (!$scope.profileSeriesContains(name)) {
			var promise = $http.get('https://omdbapi.com/?i=' + name.imdbID + '&plot=full&apikey=93330d3c');
			promise.then(function(response) {
				var fullSerie = response.data;
				$scope.profileSeries.push(fullSerie);
			}).catch(function(error) {
				console.log(error);
			});		
		} else {
			alert("Serie already added.");
		};

		if ($scope.watchListSeries,name){
			var pos = $scope.watchListSeries.indexOf(name);
			$scope.watchListSeries.splice(pos,1);
		}
	};

	$scope.removeProfileSerie = function(name) {
		var validate = confirm("Are you sure that you want to remove: " + name.Title + " from your profile?");
		if (validate) {
			var pos = $scope.profileSeries.indexOf(name);
			$scope.profileSeries.splice(pos,1);
		}
	}

	$scope.watchAddSerie = function(name) {
		if ($scope.watchListSeries,name){
			var pos = $scope.watchListSeries.indexOf(name);
			$scope.watchListSeries.splice(pos,1);
		}
		if ($scope.profileSeriesContains(name)) {
			alert("You can't add this serie in your watchlist, because it is already in your profile");
		}else {
			if (($scope.watchListSeries,name)) {
				$scope.watchListSeries.push(name);
			} else {
				alert("Serie already in your watchlist");
			};
		};
	};

	$scope.watchRemoveSerie = function(name) {
		var pos = $scope.watchListSeries.indexOf(name);
		$scope.watchListSeries.splice(pos,1);
	};

	$scope.profileSeriesContains = function(name) {
		for (var i = 0; i < $scope.profileSeries.length; i++) {
			if ($scope.profileSeries[i].imdbID == name.imdbID) {
				return true;
			}
		}
		return false;
	};
	$scope.watchListContains = function(name) {
		for (var i = 0; i < $scope.watchListSeries.length; i++) {
			if ($scope.watchListSeries[i].imdbID == name.imdbID) {
				return true;
			}
		}
		return false;
	};

	$scope.showSearch = function() {
		$scope.search = true;
		$scope.profile = false;
		$scope.watchList = false;
	}

	$scope.showProfile  = function() {
		$scope.search = false;
		$scope.profile = true;
		$scope.watchList = false;
	}

	$scope.showWatchList = function() {
		$scope.search = false;
		$scope.profile = false;
		$scope.watchList = true;
	}

	$scope.setMyRating = function(serie,nota) {
		serie.myRating = nota;
	};

	$scope.setLastEpisode = function(serie, lastep) {
		serie.lastEpisode = lastep;
	}

});