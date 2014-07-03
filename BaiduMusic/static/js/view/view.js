/* View */
var MusicOnlineIndexView = null,
	BillBoardListView = null,
	ArtistView = null,
	ArtistInfoView = null,
	ArtistAlbumSongsView = null,
	RadioView = null,
	NewAlbumShelvesView = null,
	NewAlbumShelvesDetailView = null,
	FeaturedAlbumsView = null,
	FeaturedAlbumsDetailView = null,
	PlazaNewArrivalView = null,
	SearchView = null;
    NetworkFavoritesView = null,
    RegisterView = null,
    LoginView = null,
    PlayView = null,
    SearchNearbyResultView = null,
    SearchConditionalResultView = null,
    DetailInforView = null,
    RankingListSearchView = null,
    RankingRestaurantView = null,
    FavoritesListView = null,
    MoreView = null,
    MyMusicView = null;
    MyCloudSongView = null;

var ViewInitFlag={
		MusicOnlineIndexView:true,
		BillBoardListView:true,
		ArtistView:true,
		ArtistInfoView:true,
		ArtistAlbumSongs:true,
		NewAlbumShelvesView:true,
		PlazaNewArrivalView:true,
		FeaturedAlbumsView:true,
		FeaturedAlbumsDetailView:true,
		PlayView:true,
		RadioView:true,
		SearchView:true,
		MyMusicView:true,
		MyCloudSongView:true,
};
    var DefaultView = MusicOnlineIndexView;
    /* Base View Class */
    var View = function (name) {
        this.name = name;
        this.show = function () {
        	$("#"+this.name).removeClass("hidden");
        };
        this.hide = function(){
        	$("#"+this.name).addClass("hidden");
        };
    };
    
//The song info about ready to play
var ReadySong ={
		song_id:"",
};
















