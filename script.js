function videoList(){
console.log('hello');
	$list = $('ul#list');
		var videos = [
			{ id : '4fndeDfaWCg', title : 'Backstreet Boys - I Want It That Way', category: 'music'},
            { id : 'VdQY7BusJNU', title : 'Cyndi Lauper - Time After Time', category : 'music'},
            { id : 'hoskDZRLOCs', title : 'Elton John - Tiny Dancer', category : 'music'},
            { id : 'EYv2czin7WI', title : 'Nirvana - Where Did You Sleep Last Night (MTV Unplugged)', category : 'music'},
            { id : 'pKAwXLVxuZQ', title : 'The Room | Best Moments', category : 'movies'},
            { id : 'gGV4hxhxW8o', title : '10 Things I Hate About You. (poem)', category : 'movies'},
            { id : 'J75QhbFOo7M', title : 'Titanic 1997 - Flooding Grand Staircase EXTENDED', category : 'movies'},
            { id : 'vmVaCbxkd34', title : 'Almost Famous - America scene', category : 'movies'},
            { id : 'DqwzvtjeYBQ', title : 'Joey trying to speak French', category : 'tv'},
            { id : 'veCEVyUW2UE', title : 'HIMYM - Swarley', category : 'tv'},
            { id : 'GDH2J8iyQdY', title : 'Grey\'s Anatomy: Funny Cristina Moments', category : 'tv'}
					];
					function sortAZ(){
						videos.sort(function(a, b){
						    var titleA=a.title.toLowerCase(), titleB=b.title.toLowerCase();
						    if (titleA < titleB){
						        return -1; 
						    } 
						    if (titleA > titleB){
						        return 1;
						    }
					    	return 0;
						});
					}
					function sortZA(){
						videos.sort(function(a, b){
						    var titleA=a.title.toLowerCase(), titleB=b.title.toLowerCase();
						    if (titleA < titleB){
						        return 1; 
						    } 
						    if (titleA > titleB){
						        return -1;
						    }
					    	return 0; 
						});
					}

					// sort the videos on load
					sortAZ();

					$('.order_list .fa-angle-up').on('click', function(){
						sortAZ();
						$('#youtube_videos ul#list li.in').remove();
						displayVideos(videos);
					});
					$('.order_list .fa-angle-down').on('click', function(){
						sortZA();
						$('#youtube_videos ul#list li.in').remove();
						displayVideos(videos);
					});


					$(document).on('change', '#filter', function () {

						var selection = this.value;
						var stop = false;
					    var selectedVideos = $.map( videos, function(video) {
						    if (video.category === selection) {
						      return video;
						    } else if(selection === 'All' && stop === false) {
						      return videos;
						    }
					  	});
					  	$('#youtube_videos ul#list li.in').remove();
						displayVideos(selectedVideos);
					});
					function displayVideos(array){
						for( i=0; i < array.length; i++ ){
							if(array[i].category !== undefined){
								$li = '<li data-videoid="' + array[i].id + '" class="in ' + array[i].category + '">' + array[i].title + '</li>';	
							} else {
								$li = '<li data-videoid="' + array[i].id + '" class="in">' + array[i].title + '</li>';	
							}
							$list.append($li);
						}
					}
					displayVideos(videos);
          
					
				}
				videoList();
        
  $('.video_title').text(($('#youtube_videos li.in:first-child').text()));
			  	var jobCount = $('#list .in').length;
			  	$('.list-count').text(jobCount + ' items');
				    
				  
				$("#search-text").keyup(function () {
				  
				    var searchTerm = $("#search-text").val();
				    var listItem = $('#list').children('li');
				    var searchSplit = searchTerm.replace(/ /g, "'):containsi('")
				    
					$.extend($.expr[':'], {
					  'containsi': function(elem, i, match, array)
					  {
					    return (elem.textContent || elem.innerText || '').toLowerCase()
					    .indexOf((match[3] || "").toLowerCase()) >= 0;
					  }
					});
				    $("#list li").not(":containsi('" + searchSplit + "')").each(function(e)   {
				      $(this).addClass('hiding out').removeClass('in');
				      setTimeout(function() {
				          $('.out').addClass('hidden');
				        }, 300);
				    });
				    $("#list li:containsi('" + searchSplit + "')").each(function(e) {
				      $(this).removeClass('hidden out').addClass('in');
				      setTimeout(function() {
				          $('.in').removeClass('hiding');
				        }, 100);
				    });
				  
				    var jobCount = $('#list .in').length;
				    $('.list-count').text(jobCount + ' items');
				    
				    //shows empty state text when no jobs found
				    if(jobCount == '0') {
				      $('#list').addClass('empty');
				    }
				    else {
				      $('#list').removeClass('empty');
				    }
				    
				  });
				         




			// 2. This code loads the IFrame Player API code asynchronously.
		      var tag = document.createElement('script');

		      tag.src = "https://www.youtube.com/iframe_api";
		      var firstScriptTag = document.getElementsByTagName('script')[0];
		      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		      // 3. This function creates an <iframe> (and YouTube player)
		      //    after the API code downloads.
		      
        var firstVideoId = $('#youtube_videos li.in:first-child').data('videoid');
          var player;
		      function onYouTubeIframeAPIReady(id=firstVideoId) {
		        player = new YT.Player('player', {
		          height: '390',
		          width: '640',
		          videoId: id,
		          events: {
		            'onReady': onPlayerReady,
		            'onStateChange': onPlayerStateChange
		          }
		        });
		      }

		      // 4. The API will call this function when the video player is ready.
		      function onPlayerReady(event) {
		        event.target.playVideo();
		      }

		      $(document).on('click', '#youtube_videos ul#list li.in', function(){
		      		var videoId = $(this).data('videoid');
		      		$('#youtube_videos li.in').removeClass('active');
		      		$(this).addClass('active');
		      		$('.video_title').text(($(this).text()));
		      		player.loadVideoById(videoId);
		      });

		       function recordVideoWatched(playerStatus) {
				    var videoId = player.getVideoData()['video_id'];
				    if (playerStatus == -1) {
				    } else if (playerStatus == 0) {
				    	console.log(videoId);
				    } else if (playerStatus == 1) {
				    } else if (playerStatus == 2) {
				    } else if (playerStatus == 3) {
				    } else if (playerStatus == 5) {
				    }
				  }
			  function onPlayerStateChange(event) {
			    recordVideoWatched(event.data);
			  }