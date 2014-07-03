




<!DOCTYPE html>
<html>
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# object: http://ogp.me/ns/object# article: http://ogp.me/ns/article# profile: http://ogp.me/ns/profile#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Roller/src/jquery.fs.roller.js at master · benplum/Roller · GitHub</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub" />
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub" />
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-114.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-144.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144.png" />
    <meta property="fb:app_id" content="1401488693436528"/>

      <meta content="@github" name="twitter:site" /><meta content="summary" name="twitter:card" /><meta content="benplum/Roller" name="twitter:title" /><meta content="Roller - A jQuery plugin for simple content carousels. " name="twitter:description" /><meta content="https://0.gravatar.com/avatar/a7f4b90f7a2a8d6223be4ed813169f7d?d=https%3A%2F%2Fidenticons.github.com%2F09456647f272d67440010044656a89bb.png&amp;r=x&amp;s=400" name="twitter:image:src" />
<meta content="GitHub" property="og:site_name" /><meta content="object" property="og:type" /><meta content="https://0.gravatar.com/avatar/a7f4b90f7a2a8d6223be4ed813169f7d?d=https%3A%2F%2Fidenticons.github.com%2F09456647f272d67440010044656a89bb.png&amp;r=x&amp;s=400" property="og:image" /><meta content="benplum/Roller" property="og:title" /><meta content="https://github.com/benplum/Roller" property="og:url" /><meta content="Roller - A jQuery plugin for simple content carousels. " property="og:description" />

    <meta name="hostname" content="github-fe126-cp1-prd.iad.github.net">
    <meta name="ruby" content="ruby 2.1.0p0-github-tcmalloc (87c9373a41) [x86_64-linux]">
    <link rel="assets" href="https://github.global.ssl.fastly.net/">
    <link rel="conduit-xhr" href="https://ghconduit.com:25035/">
    <link rel="xhr-socket" href="/_sockets" />


    <meta name="msapplication-TileImage" content="/windows-tile.png" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="selected-link" value="repo_source" data-pjax-transient />
    <meta content="collector.githubapp.com" name="octolytics-host" /><meta content="collector-cdn.github.com" name="octolytics-script-host" /><meta content="github" name="octolytics-app-id" /><meta content="7139F682:3BE1:55F209E:53193368" name="octolytics-dimension-request_id" />
    

    
    
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />

    <meta content="authenticity_token" name="csrf-param" />
<meta content="y41fMjOjhInK8U9NHkYebgeYBUqJH52UmjmILV5svvU=" name="csrf-token" />

    <link href="https://github.global.ssl.fastly.net/assets/github-efc81cb4b97f3a8aa50591503541e483fdcfcd01.css" media="all" rel="stylesheet" type="text/css" />
    <link href="https://github.global.ssl.fastly.net/assets/github2-06954e0e776374cf6f29a77b92d2861a8584e08a.css" media="all" rel="stylesheet" type="text/css" />
    
    


      <script crossorigin="anonymous" src="https://github.global.ssl.fastly.net/assets/frameworks-871d634893ce516b04e248598f5e07f9a15e7a3b.js" type="text/javascript"></script>
      <script async="async" crossorigin="anonymous" src="https://github.global.ssl.fastly.net/assets/github-2fdd2c3a2bfc184e4227d29c319e02c9a049f061.js" type="text/javascript"></script>
      
      <meta http-equiv="x-pjax-version" content="53bd79315a423af90c80d4b72b0b08cc">

        <link data-pjax-transient rel='permalink' href='/benplum/Roller/blob/0fe1f863494775dc750a76bd232e0e3736a9980a/src/jquery.fs.roller.js'>

  <meta name="description" content="Roller - A jQuery plugin for simple content carousels. " />

  <meta content="1130075" name="octolytics-dimension-user_id" /><meta content="benplum" name="octolytics-dimension-user_login" /><meta content="12908821" name="octolytics-dimension-repository_id" /><meta content="benplum/Roller" name="octolytics-dimension-repository_nwo" /><meta content="true" name="octolytics-dimension-repository_public" /><meta content="false" name="octolytics-dimension-repository_is_fork" /><meta content="12908821" name="octolytics-dimension-repository_network_root_id" /><meta content="benplum/Roller" name="octolytics-dimension-repository_network_root_nwo" />
  <link href="https://github.com/benplum/Roller/commits/master.atom" rel="alternate" title="Recent Commits to Roller:master" type="application/atom+xml" />

  </head>


  <body class="logged_out  env-production windows vis-public page-blob tipsy-tooltips">
    <div class="wrapper">
      
      
      
      


      
      <div class="header header-logged-out">
  <div class="container clearfix">

    <a class="header-logo-wordmark" href="https://github.com/">
      <span class="mega-octicon octicon-logo-github"></span>
    </a>

    <div class="header-actions">
        <a class="button primary" href="/join">Sign up</a>
      <a class="button signin" href="/login?return_to=%2Fbenplum%2FRoller%2Fblob%2Fmaster%2Fsrc%2Fjquery.fs.roller.js">Sign in</a>
    </div>

    <div class="command-bar js-command-bar  in-repository">

      <ul class="top-nav">
          <li class="explore"><a href="/explore">Explore</a></li>
        <li class="features"><a href="/features">Features</a></li>
          <li class="enterprise"><a href="https://enterprise.github.com/">Enterprise</a></li>
          <li class="blog"><a href="/blog">Blog</a></li>
      </ul>
        <form accept-charset="UTF-8" action="/search" class="command-bar-form" id="top_search_form" method="get">

<input type="text" data-hotkey="/ s" name="q" id="js-command-bar-field" placeholder="Search or type a command" tabindex="1" autocapitalize="off"
    
    
      data-repo="benplum/Roller"
      data-branch="master"
      data-sha="6fe75f8e0327dc9f933b74c8d5500bc6cbf18a62"
  >

    <input type="hidden" name="nwo" value="benplum/Roller" />

    <div class="select-menu js-menu-container js-select-menu search-context-select-menu">
      <span class="minibutton select-menu-button js-menu-target" role="button" aria-haspopup="true">
        <span class="js-select-button">This repository</span>
      </span>

      <div class="select-menu-modal-holder js-menu-content js-navigation-container" aria-hidden="true">
        <div class="select-menu-modal">

          <div class="select-menu-item js-navigation-item js-this-repository-navigation-item selected">
            <span class="select-menu-item-icon octicon octicon-check"></span>
            <input type="radio" class="js-search-this-repository" name="search_target" value="repository" checked="checked" />
            <div class="select-menu-item-text js-select-button-text">This repository</div>
          </div> <!-- /.select-menu-item -->

          <div class="select-menu-item js-navigation-item js-all-repositories-navigation-item">
            <span class="select-menu-item-icon octicon octicon-check"></span>
            <input type="radio" name="search_target" value="global" />
            <div class="select-menu-item-text js-select-button-text">All repositories</div>
          </div> <!-- /.select-menu-item -->

        </div>
      </div>
    </div>

  <span class="help tooltipped tooltipped-s" aria-label="Show command bar help">
    <span class="octicon octicon-question"></span>
  </span>


  <input type="hidden" name="ref" value="cmdform">

</form>
    </div>

  </div>
</div>




          <div class="site" itemscope itemtype="http://schema.org/WebPage">
    
    <div class="pagehead repohead instapaper_ignore readability-menu">
      <div class="container">
        

<ul class="pagehead-actions">


  <li>
    <a href="/login?return_to=%2Fbenplum%2FRoller"
    class="minibutton with-count js-toggler-target star-button tooltipped tooltipped-n"
    aria-label="You must be signed in to star a repository" rel="nofollow">
    <span class="octicon octicon-star"></span>Star
  </a>

    <a class="social-count js-social-count" href="/benplum/Roller/stargazers">
      3
    </a>

  </li>

    <li>
      <a href="/login?return_to=%2Fbenplum%2FRoller"
        class="minibutton with-count js-toggler-target fork-button tooltipped tooltipped-n"
        aria-label="You must be signed in to fork a repository" rel="nofollow">
        <span class="octicon octicon-git-branch"></span>Fork
      </a>
      <a href="/benplum/Roller/network" class="social-count">
        2
      </a>
    </li>
</ul>

        <h1 itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="entry-title public">
          <span class="repo-label"><span>public</span></span>
          <span class="mega-octicon octicon-repo"></span>
          <span class="author">
            <a href="/benplum" class="url fn" itemprop="url" rel="author"><span itemprop="title">benplum</span></a>
          </span>
          <span class="repohead-name-divider">/</span>
          <strong><a href="/benplum/Roller" class="js-current-repository js-repo-home-link">Roller</a></strong>

          <span class="page-context-loader">
            <img alt="Octocat-spinner-32" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
          </span>

        </h1>
      </div><!-- /.container -->
    </div><!-- /.repohead -->

    <div class="container">
      <div class="repository-with-sidebar repo-container new-discussion-timeline js-new-discussion-timeline  ">
        <div class="repository-sidebar clearfix">
            

<div class="sunken-menu vertical-right repo-nav js-repo-nav js-repository-container-pjax js-octicon-loaders">
  <div class="sunken-menu-contents">
    <ul class="sunken-menu-group">
      <li class="tooltipped tooltipped-w" aria-label="Code">
        <a href="/benplum/Roller" aria-label="Code" class="selected js-selected-navigation-item sunken-menu-item" data-gotokey="c" data-pjax="true" data-selected-links="repo_source repo_downloads repo_commits repo_tags repo_branches /benplum/Roller">
          <span class="octicon octicon-code"></span> <span class="full-word">Code</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

        <li class="tooltipped tooltipped-w" aria-label="Issues">
          <a href="/benplum/Roller/issues" aria-label="Issues" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-gotokey="i" data-selected-links="repo_issues /benplum/Roller/issues">
            <span class="octicon octicon-issue-opened"></span> <span class="full-word">Issues</span>
            <span class='counter'>0</span>
            <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>        </li>

      <li class="tooltipped tooltipped-w" aria-label="Pull Requests">
        <a href="/benplum/Roller/pulls" aria-label="Pull Requests" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-gotokey="p" data-selected-links="repo_pulls /benplum/Roller/pulls">
            <span class="octicon octicon-git-pull-request"></span> <span class="full-word">Pull Requests</span>
            <span class='counter'>0</span>
            <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>


    </ul>
    <div class="sunken-menu-separator"></div>
    <ul class="sunken-menu-group">

      <li class="tooltipped tooltipped-w" aria-label="Pulse">
        <a href="/benplum/Roller/pulse" aria-label="Pulse" class="js-selected-navigation-item sunken-menu-item" data-pjax="true" data-selected-links="pulse /benplum/Roller/pulse">
          <span class="octicon octicon-pulse"></span> <span class="full-word">Pulse</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

      <li class="tooltipped tooltipped-w" aria-label="Graphs">
        <a href="/benplum/Roller/graphs" aria-label="Graphs" class="js-selected-navigation-item sunken-menu-item" data-pjax="true" data-selected-links="repo_graphs repo_contributors /benplum/Roller/graphs">
          <span class="octicon octicon-graph"></span> <span class="full-word">Graphs</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

      <li class="tooltipped tooltipped-w" aria-label="Network">
        <a href="/benplum/Roller/network" aria-label="Network" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-selected-links="repo_network /benplum/Roller/network">
          <span class="octicon octicon-git-branch"></span> <span class="full-word">Network</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>
    </ul>


  </div>
</div>

              <div class="only-with-full-nav">
                

  

<div class="clone-url open"
  data-protocol-type="http"
  data-url="/users/set_protocol?protocol_selector=http&amp;protocol_type=clone">
  <h3><strong>HTTPS</strong> clone URL</h3>
  <div class="clone-url-box">
    <input type="text" class="clone js-url-field"
           value="https://github.com/benplum/Roller.git" readonly="readonly">

    <span aria-label="copy to clipboard" class="js-zeroclipboard url-box-clippy minibutton zeroclipboard-button" data-clipboard-text="https://github.com/benplum/Roller.git" data-copied-hint="copied!"><span class="octicon octicon-clippy"></span></span>
  </div>
</div>

  

<div class="clone-url "
  data-protocol-type="subversion"
  data-url="/users/set_protocol?protocol_selector=subversion&amp;protocol_type=clone">
  <h3><strong>Subversion</strong> checkout URL</h3>
  <div class="clone-url-box">
    <input type="text" class="clone js-url-field"
           value="https://github.com/benplum/Roller" readonly="readonly">

    <span aria-label="copy to clipboard" class="js-zeroclipboard url-box-clippy minibutton zeroclipboard-button" data-clipboard-text="https://github.com/benplum/Roller" data-copied-hint="copied!"><span class="octicon octicon-clippy"></span></span>
  </div>
</div>


<p class="clone-options">You can clone with
      <a href="#" class="js-clone-selector" data-protocol="http">HTTPS</a>
      or <a href="#" class="js-clone-selector" data-protocol="subversion">Subversion</a>.
  <span class="help tooltipped tooltipped-n" aria-label="Get help on which URL is right for you.">
    <a href="https://help.github.com/articles/which-remote-url-should-i-use">
    <span class="octicon octicon-question"></span>
    </a>
  </span>
</p>


  <a href="http://windows.github.com" class="minibutton sidebar-button">
    <span class="octicon octicon-device-desktop"></span>
    Clone in Desktop
  </a>

                <a href="/benplum/Roller/archive/master.zip"
                   class="minibutton sidebar-button"
                   title="Download this repository as a zip file"
                   rel="nofollow">
                  <span class="octicon octicon-cloud-download"></span>
                  Download ZIP
                </a>
              </div>
        </div><!-- /.repository-sidebar -->

        <div id="js-repo-pjax-container" class="repository-content context-loader-container" data-pjax-container>
          


<!-- blob contrib key: blob_contributors:v21:ec745a8c5ab0f067c5c34ab0078b9b52 -->

<p title="This is a placeholder element" class="js-history-link-replace hidden"></p>

<a href="/benplum/Roller/find/master" data-pjax data-hotkey="t" class="js-show-file-finder" style="display:none">Show File Finder</a>

<div class="file-navigation">
  

<div class="select-menu js-menu-container js-select-menu" >
  <span class="minibutton select-menu-button js-menu-target" data-hotkey="w"
    data-master-branch="master"
    data-ref="master"
    role="button" aria-label="Switch branches or tags" tabindex="0" aria-haspopup="true">
    <span class="octicon octicon-git-branch"></span>
    <i>branch:</i>
    <span class="js-select-button">master</span>
  </span>

  <div class="select-menu-modal-holder js-menu-content js-navigation-container" data-pjax aria-hidden="true">

    <div class="select-menu-modal">
      <div class="select-menu-header">
        <span class="select-menu-title">Switch branches/tags</span>
        <span class="octicon octicon-remove-close js-menu-close"></span>
      </div> <!-- /.select-menu-header -->

      <div class="select-menu-filters">
        <div class="select-menu-text-filter">
          <input type="text" aria-label="Filter branches/tags" id="context-commitish-filter-field" class="js-filterable-field js-navigation-enable" placeholder="Filter branches/tags">
        </div>
        <div class="select-menu-tabs">
          <ul>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="branches" class="js-select-menu-tab">Branches</a>
            </li>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="tags" class="js-select-menu-tab">Tags</a>
            </li>
          </ul>
        </div><!-- /.select-menu-tabs -->
      </div><!-- /.select-menu-filters -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="branches">

        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <div class="select-menu-item js-navigation-item selected">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/blob/master/src/jquery.fs.roller.js"
                 data-name="master"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="master">master</a>
            </div> <!-- /.select-menu-item -->
        </div>

          <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="tags">
        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/3.0.18/src/jquery.fs.roller.js"
                 data-name="3.0.18"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="3.0.18">3.0.18</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/3.0.17/src/jquery.fs.roller.js"
                 data-name="3.0.17"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="3.0.17">3.0.17</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/3.0.16/src/jquery.fs.roller.js"
                 data-name="3.0.16"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="3.0.16">3.0.16</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/3.0.15/src/jquery.fs.roller.js"
                 data-name="3.0.15"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="3.0.15">3.0.15</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/3.0.14/src/jquery.fs.roller.js"
                 data-name="3.0.14"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="3.0.14">3.0.14</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/3.0.13/src/jquery.fs.roller.js"
                 data-name="3.0.13"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="3.0.13">3.0.13</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/3.0.12/src/jquery.fs.roller.js"
                 data-name="3.0.12"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="3.0.12">3.0.12</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/3.0.11/src/jquery.fs.roller.js"
                 data-name="3.0.11"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="3.0.11">3.0.11</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/3.0.10/src/jquery.fs.roller.js"
                 data-name="3.0.10"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="3.0.10">3.0.10</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/3.0.9/src/jquery.fs.roller.js"
                 data-name="3.0.9"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="3.0.9">3.0.9</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/3.0.8/src/jquery.fs.roller.js"
                 data-name="3.0.8"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="3.0.8">3.0.8</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/3.0.7/src/jquery.fs.roller.js"
                 data-name="3.0.7"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="3.0.7">3.0.7</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/3.0.6/src/jquery.fs.roller.js"
                 data-name="3.0.6"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="3.0.6">3.0.6</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/3.0.5/src/jquery.fs.roller.js"
                 data-name="3.0.5"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="3.0.5">3.0.5</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/3.0.4/src/jquery.fs.roller.js"
                 data-name="3.0.4"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="3.0.4">3.0.4</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/3.0.3/src/jquery.fs.roller.js"
                 data-name="3.0.3"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="3.0.3">3.0.3</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/3.0.2/src/jquery.fs.roller.js"
                 data-name="3.0.2"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="3.0.2">3.0.2</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/3.0.1/src/jquery.fs.roller.js"
                 data-name="3.0.1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="3.0.1">3.0.1</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/3.0.0/src/jquery.fs.roller.js"
                 data-name="3.0.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="3.0.0">3.0.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/1.2.7/src/jquery.fs.roller.js"
                 data-name="1.2.7"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="1.2.7">1.2.7</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/1.2.5/src/jquery.fs.roller.js"
                 data-name="1.2.5"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="1.2.5">1.2.5</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/1.2.4/src/jquery.fs.roller.js"
                 data-name="1.2.4"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="1.2.4">1.2.4</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/1.2.3/src/jquery.fs.roller.js"
                 data-name="1.2.3"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="1.2.3">1.2.3</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/1.2.2/src/jquery.fs.roller.js"
                 data-name="1.2.2"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="1.2.2">1.2.2</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/1.2.1/src/jquery.fs.roller.js"
                 data-name="1.2.1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="1.2.1">1.2.1</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/1.2.0/src/jquery.fs.roller.js"
                 data-name="1.2.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="1.2.0">1.2.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/1.1.0/src/jquery.fs.roller.js"
                 data-name="1.1.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="1.1.0">1.1.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/1.0.0/src/jquery.fs.roller.js"
                 data-name="1.0.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="1.0.0">1.0.0</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/0.0.7/src/jquery.fs.roller.js"
                 data-name="0.0.7"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="0.0.7">0.0.7</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/0.0.6/src/jquery.fs.roller.js"
                 data-name="0.0.6"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="0.0.6">0.0.6</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/0.0.5/src/jquery.fs.roller.js"
                 data-name="0.0.5"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="0.0.5">0.0.5</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/0.0.4/src/jquery.fs.roller.js"
                 data-name="0.0.4"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="0.0.4">0.0.4</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/0.0.3/src/jquery.fs.roller.js"
                 data-name="0.0.3"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="0.0.3">0.0.3</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/0.0.2/src/jquery.fs.roller.js"
                 data-name="0.0.2"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="0.0.2">0.0.2</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/benplum/Roller/tree/0.0.1/src/jquery.fs.roller.js"
                 data-name="0.0.1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="0.0.1">0.0.1</a>
            </div> <!-- /.select-menu-item -->
        </div>

        <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

    </div> <!-- /.select-menu-modal -->
  </div> <!-- /.select-menu-modal-holder -->
</div> <!-- /.select-menu -->

  <div class="breadcrumb">
    <span class='repo-root js-repo-root'><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/benplum/Roller" data-branch="master" data-direction="back" data-pjax="true" itemscope="url"><span itemprop="title">Roller</span></a></span></span><span class="separator"> / </span><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/benplum/Roller/tree/master/src" data-branch="master" data-direction="back" data-pjax="true" itemscope="url"><span itemprop="title">src</span></a></span><span class="separator"> / </span><strong class="final-path">jquery.fs.roller.js</strong> <span aria-label="copy to clipboard" class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="src/jquery.fs.roller.js" data-copied-hint="copied!"><span class="octicon octicon-clippy"></span></span>
  </div>
</div>


  <div class="commit commit-loader file-history-tease js-deferred-content" data-url="/benplum/Roller/contributors/master/src/jquery.fs.roller.js">
    Fetching contributors…

    <div class="participation">
      <p class="loader-loading"><img alt="Octocat-spinner-32-eaf2f5" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32-EAF2F5.gif" width="16" /></p>
      <p class="loader-error">Cannot retrieve contributors at this time</p>
    </div>
  </div>

<div class="file-box">
  <div class="file">
    <div class="meta clearfix">
      <div class="info file-name">
        <span class="icon"><b class="octicon octicon-file-text"></b></span>
        <span class="mode" title="File Mode">file</span>
        <span class="meta-divider"></span>
          <span>754 lines (655 sloc)</span>
          <span class="meta-divider"></span>
        <span>19.935 kb</span>
      </div>
      <div class="actions">
        <div class="button-group">
            <a class="minibutton tooltipped tooltipped-w"
               href="http://windows.github.com" aria-label="Open this file in GitHub for Windows">
                <span class="octicon octicon-device-desktop"></span> Open
            </a>
              <a class="minibutton disabled tooltipped tooltipped-w" href="#"
                 aria-label="You must be signed in to make or propose changes">Edit</a>
          <a href="/benplum/Roller/raw/master/src/jquery.fs.roller.js" class="button minibutton " id="raw-url">Raw</a>
            <a href="/benplum/Roller/blame/master/src/jquery.fs.roller.js" class="button minibutton js-update-url-with-hash">Blame</a>
          <a href="/benplum/Roller/commits/master/src/jquery.fs.roller.js" class="button minibutton " rel="nofollow">History</a>
        </div><!-- /.button-group -->
          <a class="minibutton danger disabled empty-icon tooltipped tooltipped-w" href="#"
             aria-label="You must be signed in to make or propose changes">
          Delete
        </a>
      </div><!-- /.actions -->
    </div>
        <div class="blob-wrapper data type-javascript js-blob-data">
        <table class="file-code file-diff tab-size-8">
          <tr class="file-code-line">
            <td class="blob-line-nums">
              <span id="L1" rel="#L1">1</span>
<span id="L2" rel="#L2">2</span>
<span id="L3" rel="#L3">3</span>
<span id="L4" rel="#L4">4</span>
<span id="L5" rel="#L5">5</span>
<span id="L6" rel="#L6">6</span>
<span id="L7" rel="#L7">7</span>
<span id="L8" rel="#L8">8</span>
<span id="L9" rel="#L9">9</span>
<span id="L10" rel="#L10">10</span>
<span id="L11" rel="#L11">11</span>
<span id="L12" rel="#L12">12</span>
<span id="L13" rel="#L13">13</span>
<span id="L14" rel="#L14">14</span>
<span id="L15" rel="#L15">15</span>
<span id="L16" rel="#L16">16</span>
<span id="L17" rel="#L17">17</span>
<span id="L18" rel="#L18">18</span>
<span id="L19" rel="#L19">19</span>
<span id="L20" rel="#L20">20</span>
<span id="L21" rel="#L21">21</span>
<span id="L22" rel="#L22">22</span>
<span id="L23" rel="#L23">23</span>
<span id="L24" rel="#L24">24</span>
<span id="L25" rel="#L25">25</span>
<span id="L26" rel="#L26">26</span>
<span id="L27" rel="#L27">27</span>
<span id="L28" rel="#L28">28</span>
<span id="L29" rel="#L29">29</span>
<span id="L30" rel="#L30">30</span>
<span id="L31" rel="#L31">31</span>
<span id="L32" rel="#L32">32</span>
<span id="L33" rel="#L33">33</span>
<span id="L34" rel="#L34">34</span>
<span id="L35" rel="#L35">35</span>
<span id="L36" rel="#L36">36</span>
<span id="L37" rel="#L37">37</span>
<span id="L38" rel="#L38">38</span>
<span id="L39" rel="#L39">39</span>
<span id="L40" rel="#L40">40</span>
<span id="L41" rel="#L41">41</span>
<span id="L42" rel="#L42">42</span>
<span id="L43" rel="#L43">43</span>
<span id="L44" rel="#L44">44</span>
<span id="L45" rel="#L45">45</span>
<span id="L46" rel="#L46">46</span>
<span id="L47" rel="#L47">47</span>
<span id="L48" rel="#L48">48</span>
<span id="L49" rel="#L49">49</span>
<span id="L50" rel="#L50">50</span>
<span id="L51" rel="#L51">51</span>
<span id="L52" rel="#L52">52</span>
<span id="L53" rel="#L53">53</span>
<span id="L54" rel="#L54">54</span>
<span id="L55" rel="#L55">55</span>
<span id="L56" rel="#L56">56</span>
<span id="L57" rel="#L57">57</span>
<span id="L58" rel="#L58">58</span>
<span id="L59" rel="#L59">59</span>
<span id="L60" rel="#L60">60</span>
<span id="L61" rel="#L61">61</span>
<span id="L62" rel="#L62">62</span>
<span id="L63" rel="#L63">63</span>
<span id="L64" rel="#L64">64</span>
<span id="L65" rel="#L65">65</span>
<span id="L66" rel="#L66">66</span>
<span id="L67" rel="#L67">67</span>
<span id="L68" rel="#L68">68</span>
<span id="L69" rel="#L69">69</span>
<span id="L70" rel="#L70">70</span>
<span id="L71" rel="#L71">71</span>
<span id="L72" rel="#L72">72</span>
<span id="L73" rel="#L73">73</span>
<span id="L74" rel="#L74">74</span>
<span id="L75" rel="#L75">75</span>
<span id="L76" rel="#L76">76</span>
<span id="L77" rel="#L77">77</span>
<span id="L78" rel="#L78">78</span>
<span id="L79" rel="#L79">79</span>
<span id="L80" rel="#L80">80</span>
<span id="L81" rel="#L81">81</span>
<span id="L82" rel="#L82">82</span>
<span id="L83" rel="#L83">83</span>
<span id="L84" rel="#L84">84</span>
<span id="L85" rel="#L85">85</span>
<span id="L86" rel="#L86">86</span>
<span id="L87" rel="#L87">87</span>
<span id="L88" rel="#L88">88</span>
<span id="L89" rel="#L89">89</span>
<span id="L90" rel="#L90">90</span>
<span id="L91" rel="#L91">91</span>
<span id="L92" rel="#L92">92</span>
<span id="L93" rel="#L93">93</span>
<span id="L94" rel="#L94">94</span>
<span id="L95" rel="#L95">95</span>
<span id="L96" rel="#L96">96</span>
<span id="L97" rel="#L97">97</span>
<span id="L98" rel="#L98">98</span>
<span id="L99" rel="#L99">99</span>
<span id="L100" rel="#L100">100</span>
<span id="L101" rel="#L101">101</span>
<span id="L102" rel="#L102">102</span>
<span id="L103" rel="#L103">103</span>
<span id="L104" rel="#L104">104</span>
<span id="L105" rel="#L105">105</span>
<span id="L106" rel="#L106">106</span>
<span id="L107" rel="#L107">107</span>
<span id="L108" rel="#L108">108</span>
<span id="L109" rel="#L109">109</span>
<span id="L110" rel="#L110">110</span>
<span id="L111" rel="#L111">111</span>
<span id="L112" rel="#L112">112</span>
<span id="L113" rel="#L113">113</span>
<span id="L114" rel="#L114">114</span>
<span id="L115" rel="#L115">115</span>
<span id="L116" rel="#L116">116</span>
<span id="L117" rel="#L117">117</span>
<span id="L118" rel="#L118">118</span>
<span id="L119" rel="#L119">119</span>
<span id="L120" rel="#L120">120</span>
<span id="L121" rel="#L121">121</span>
<span id="L122" rel="#L122">122</span>
<span id="L123" rel="#L123">123</span>
<span id="L124" rel="#L124">124</span>
<span id="L125" rel="#L125">125</span>
<span id="L126" rel="#L126">126</span>
<span id="L127" rel="#L127">127</span>
<span id="L128" rel="#L128">128</span>
<span id="L129" rel="#L129">129</span>
<span id="L130" rel="#L130">130</span>
<span id="L131" rel="#L131">131</span>
<span id="L132" rel="#L132">132</span>
<span id="L133" rel="#L133">133</span>
<span id="L134" rel="#L134">134</span>
<span id="L135" rel="#L135">135</span>
<span id="L136" rel="#L136">136</span>
<span id="L137" rel="#L137">137</span>
<span id="L138" rel="#L138">138</span>
<span id="L139" rel="#L139">139</span>
<span id="L140" rel="#L140">140</span>
<span id="L141" rel="#L141">141</span>
<span id="L142" rel="#L142">142</span>
<span id="L143" rel="#L143">143</span>
<span id="L144" rel="#L144">144</span>
<span id="L145" rel="#L145">145</span>
<span id="L146" rel="#L146">146</span>
<span id="L147" rel="#L147">147</span>
<span id="L148" rel="#L148">148</span>
<span id="L149" rel="#L149">149</span>
<span id="L150" rel="#L150">150</span>
<span id="L151" rel="#L151">151</span>
<span id="L152" rel="#L152">152</span>
<span id="L153" rel="#L153">153</span>
<span id="L154" rel="#L154">154</span>
<span id="L155" rel="#L155">155</span>
<span id="L156" rel="#L156">156</span>
<span id="L157" rel="#L157">157</span>
<span id="L158" rel="#L158">158</span>
<span id="L159" rel="#L159">159</span>
<span id="L160" rel="#L160">160</span>
<span id="L161" rel="#L161">161</span>
<span id="L162" rel="#L162">162</span>
<span id="L163" rel="#L163">163</span>
<span id="L164" rel="#L164">164</span>
<span id="L165" rel="#L165">165</span>
<span id="L166" rel="#L166">166</span>
<span id="L167" rel="#L167">167</span>
<span id="L168" rel="#L168">168</span>
<span id="L169" rel="#L169">169</span>
<span id="L170" rel="#L170">170</span>
<span id="L171" rel="#L171">171</span>
<span id="L172" rel="#L172">172</span>
<span id="L173" rel="#L173">173</span>
<span id="L174" rel="#L174">174</span>
<span id="L175" rel="#L175">175</span>
<span id="L176" rel="#L176">176</span>
<span id="L177" rel="#L177">177</span>
<span id="L178" rel="#L178">178</span>
<span id="L179" rel="#L179">179</span>
<span id="L180" rel="#L180">180</span>
<span id="L181" rel="#L181">181</span>
<span id="L182" rel="#L182">182</span>
<span id="L183" rel="#L183">183</span>
<span id="L184" rel="#L184">184</span>
<span id="L185" rel="#L185">185</span>
<span id="L186" rel="#L186">186</span>
<span id="L187" rel="#L187">187</span>
<span id="L188" rel="#L188">188</span>
<span id="L189" rel="#L189">189</span>
<span id="L190" rel="#L190">190</span>
<span id="L191" rel="#L191">191</span>
<span id="L192" rel="#L192">192</span>
<span id="L193" rel="#L193">193</span>
<span id="L194" rel="#L194">194</span>
<span id="L195" rel="#L195">195</span>
<span id="L196" rel="#L196">196</span>
<span id="L197" rel="#L197">197</span>
<span id="L198" rel="#L198">198</span>
<span id="L199" rel="#L199">199</span>
<span id="L200" rel="#L200">200</span>
<span id="L201" rel="#L201">201</span>
<span id="L202" rel="#L202">202</span>
<span id="L203" rel="#L203">203</span>
<span id="L204" rel="#L204">204</span>
<span id="L205" rel="#L205">205</span>
<span id="L206" rel="#L206">206</span>
<span id="L207" rel="#L207">207</span>
<span id="L208" rel="#L208">208</span>
<span id="L209" rel="#L209">209</span>
<span id="L210" rel="#L210">210</span>
<span id="L211" rel="#L211">211</span>
<span id="L212" rel="#L212">212</span>
<span id="L213" rel="#L213">213</span>
<span id="L214" rel="#L214">214</span>
<span id="L215" rel="#L215">215</span>
<span id="L216" rel="#L216">216</span>
<span id="L217" rel="#L217">217</span>
<span id="L218" rel="#L218">218</span>
<span id="L219" rel="#L219">219</span>
<span id="L220" rel="#L220">220</span>
<span id="L221" rel="#L221">221</span>
<span id="L222" rel="#L222">222</span>
<span id="L223" rel="#L223">223</span>
<span id="L224" rel="#L224">224</span>
<span id="L225" rel="#L225">225</span>
<span id="L226" rel="#L226">226</span>
<span id="L227" rel="#L227">227</span>
<span id="L228" rel="#L228">228</span>
<span id="L229" rel="#L229">229</span>
<span id="L230" rel="#L230">230</span>
<span id="L231" rel="#L231">231</span>
<span id="L232" rel="#L232">232</span>
<span id="L233" rel="#L233">233</span>
<span id="L234" rel="#L234">234</span>
<span id="L235" rel="#L235">235</span>
<span id="L236" rel="#L236">236</span>
<span id="L237" rel="#L237">237</span>
<span id="L238" rel="#L238">238</span>
<span id="L239" rel="#L239">239</span>
<span id="L240" rel="#L240">240</span>
<span id="L241" rel="#L241">241</span>
<span id="L242" rel="#L242">242</span>
<span id="L243" rel="#L243">243</span>
<span id="L244" rel="#L244">244</span>
<span id="L245" rel="#L245">245</span>
<span id="L246" rel="#L246">246</span>
<span id="L247" rel="#L247">247</span>
<span id="L248" rel="#L248">248</span>
<span id="L249" rel="#L249">249</span>
<span id="L250" rel="#L250">250</span>
<span id="L251" rel="#L251">251</span>
<span id="L252" rel="#L252">252</span>
<span id="L253" rel="#L253">253</span>
<span id="L254" rel="#L254">254</span>
<span id="L255" rel="#L255">255</span>
<span id="L256" rel="#L256">256</span>
<span id="L257" rel="#L257">257</span>
<span id="L258" rel="#L258">258</span>
<span id="L259" rel="#L259">259</span>
<span id="L260" rel="#L260">260</span>
<span id="L261" rel="#L261">261</span>
<span id="L262" rel="#L262">262</span>
<span id="L263" rel="#L263">263</span>
<span id="L264" rel="#L264">264</span>
<span id="L265" rel="#L265">265</span>
<span id="L266" rel="#L266">266</span>
<span id="L267" rel="#L267">267</span>
<span id="L268" rel="#L268">268</span>
<span id="L269" rel="#L269">269</span>
<span id="L270" rel="#L270">270</span>
<span id="L271" rel="#L271">271</span>
<span id="L272" rel="#L272">272</span>
<span id="L273" rel="#L273">273</span>
<span id="L274" rel="#L274">274</span>
<span id="L275" rel="#L275">275</span>
<span id="L276" rel="#L276">276</span>
<span id="L277" rel="#L277">277</span>
<span id="L278" rel="#L278">278</span>
<span id="L279" rel="#L279">279</span>
<span id="L280" rel="#L280">280</span>
<span id="L281" rel="#L281">281</span>
<span id="L282" rel="#L282">282</span>
<span id="L283" rel="#L283">283</span>
<span id="L284" rel="#L284">284</span>
<span id="L285" rel="#L285">285</span>
<span id="L286" rel="#L286">286</span>
<span id="L287" rel="#L287">287</span>
<span id="L288" rel="#L288">288</span>
<span id="L289" rel="#L289">289</span>
<span id="L290" rel="#L290">290</span>
<span id="L291" rel="#L291">291</span>
<span id="L292" rel="#L292">292</span>
<span id="L293" rel="#L293">293</span>
<span id="L294" rel="#L294">294</span>
<span id="L295" rel="#L295">295</span>
<span id="L296" rel="#L296">296</span>
<span id="L297" rel="#L297">297</span>
<span id="L298" rel="#L298">298</span>
<span id="L299" rel="#L299">299</span>
<span id="L300" rel="#L300">300</span>
<span id="L301" rel="#L301">301</span>
<span id="L302" rel="#L302">302</span>
<span id="L303" rel="#L303">303</span>
<span id="L304" rel="#L304">304</span>
<span id="L305" rel="#L305">305</span>
<span id="L306" rel="#L306">306</span>
<span id="L307" rel="#L307">307</span>
<span id="L308" rel="#L308">308</span>
<span id="L309" rel="#L309">309</span>
<span id="L310" rel="#L310">310</span>
<span id="L311" rel="#L311">311</span>
<span id="L312" rel="#L312">312</span>
<span id="L313" rel="#L313">313</span>
<span id="L314" rel="#L314">314</span>
<span id="L315" rel="#L315">315</span>
<span id="L316" rel="#L316">316</span>
<span id="L317" rel="#L317">317</span>
<span id="L318" rel="#L318">318</span>
<span id="L319" rel="#L319">319</span>
<span id="L320" rel="#L320">320</span>
<span id="L321" rel="#L321">321</span>
<span id="L322" rel="#L322">322</span>
<span id="L323" rel="#L323">323</span>
<span id="L324" rel="#L324">324</span>
<span id="L325" rel="#L325">325</span>
<span id="L326" rel="#L326">326</span>
<span id="L327" rel="#L327">327</span>
<span id="L328" rel="#L328">328</span>
<span id="L329" rel="#L329">329</span>
<span id="L330" rel="#L330">330</span>
<span id="L331" rel="#L331">331</span>
<span id="L332" rel="#L332">332</span>
<span id="L333" rel="#L333">333</span>
<span id="L334" rel="#L334">334</span>
<span id="L335" rel="#L335">335</span>
<span id="L336" rel="#L336">336</span>
<span id="L337" rel="#L337">337</span>
<span id="L338" rel="#L338">338</span>
<span id="L339" rel="#L339">339</span>
<span id="L340" rel="#L340">340</span>
<span id="L341" rel="#L341">341</span>
<span id="L342" rel="#L342">342</span>
<span id="L343" rel="#L343">343</span>
<span id="L344" rel="#L344">344</span>
<span id="L345" rel="#L345">345</span>
<span id="L346" rel="#L346">346</span>
<span id="L347" rel="#L347">347</span>
<span id="L348" rel="#L348">348</span>
<span id="L349" rel="#L349">349</span>
<span id="L350" rel="#L350">350</span>
<span id="L351" rel="#L351">351</span>
<span id="L352" rel="#L352">352</span>
<span id="L353" rel="#L353">353</span>
<span id="L354" rel="#L354">354</span>
<span id="L355" rel="#L355">355</span>
<span id="L356" rel="#L356">356</span>
<span id="L357" rel="#L357">357</span>
<span id="L358" rel="#L358">358</span>
<span id="L359" rel="#L359">359</span>
<span id="L360" rel="#L360">360</span>
<span id="L361" rel="#L361">361</span>
<span id="L362" rel="#L362">362</span>
<span id="L363" rel="#L363">363</span>
<span id="L364" rel="#L364">364</span>
<span id="L365" rel="#L365">365</span>
<span id="L366" rel="#L366">366</span>
<span id="L367" rel="#L367">367</span>
<span id="L368" rel="#L368">368</span>
<span id="L369" rel="#L369">369</span>
<span id="L370" rel="#L370">370</span>
<span id="L371" rel="#L371">371</span>
<span id="L372" rel="#L372">372</span>
<span id="L373" rel="#L373">373</span>
<span id="L374" rel="#L374">374</span>
<span id="L375" rel="#L375">375</span>
<span id="L376" rel="#L376">376</span>
<span id="L377" rel="#L377">377</span>
<span id="L378" rel="#L378">378</span>
<span id="L379" rel="#L379">379</span>
<span id="L380" rel="#L380">380</span>
<span id="L381" rel="#L381">381</span>
<span id="L382" rel="#L382">382</span>
<span id="L383" rel="#L383">383</span>
<span id="L384" rel="#L384">384</span>
<span id="L385" rel="#L385">385</span>
<span id="L386" rel="#L386">386</span>
<span id="L387" rel="#L387">387</span>
<span id="L388" rel="#L388">388</span>
<span id="L389" rel="#L389">389</span>
<span id="L390" rel="#L390">390</span>
<span id="L391" rel="#L391">391</span>
<span id="L392" rel="#L392">392</span>
<span id="L393" rel="#L393">393</span>
<span id="L394" rel="#L394">394</span>
<span id="L395" rel="#L395">395</span>
<span id="L396" rel="#L396">396</span>
<span id="L397" rel="#L397">397</span>
<span id="L398" rel="#L398">398</span>
<span id="L399" rel="#L399">399</span>
<span id="L400" rel="#L400">400</span>
<span id="L401" rel="#L401">401</span>
<span id="L402" rel="#L402">402</span>
<span id="L403" rel="#L403">403</span>
<span id="L404" rel="#L404">404</span>
<span id="L405" rel="#L405">405</span>
<span id="L406" rel="#L406">406</span>
<span id="L407" rel="#L407">407</span>
<span id="L408" rel="#L408">408</span>
<span id="L409" rel="#L409">409</span>
<span id="L410" rel="#L410">410</span>
<span id="L411" rel="#L411">411</span>
<span id="L412" rel="#L412">412</span>
<span id="L413" rel="#L413">413</span>
<span id="L414" rel="#L414">414</span>
<span id="L415" rel="#L415">415</span>
<span id="L416" rel="#L416">416</span>
<span id="L417" rel="#L417">417</span>
<span id="L418" rel="#L418">418</span>
<span id="L419" rel="#L419">419</span>
<span id="L420" rel="#L420">420</span>
<span id="L421" rel="#L421">421</span>
<span id="L422" rel="#L422">422</span>
<span id="L423" rel="#L423">423</span>
<span id="L424" rel="#L424">424</span>
<span id="L425" rel="#L425">425</span>
<span id="L426" rel="#L426">426</span>
<span id="L427" rel="#L427">427</span>
<span id="L428" rel="#L428">428</span>
<span id="L429" rel="#L429">429</span>
<span id="L430" rel="#L430">430</span>
<span id="L431" rel="#L431">431</span>
<span id="L432" rel="#L432">432</span>
<span id="L433" rel="#L433">433</span>
<span id="L434" rel="#L434">434</span>
<span id="L435" rel="#L435">435</span>
<span id="L436" rel="#L436">436</span>
<span id="L437" rel="#L437">437</span>
<span id="L438" rel="#L438">438</span>
<span id="L439" rel="#L439">439</span>
<span id="L440" rel="#L440">440</span>
<span id="L441" rel="#L441">441</span>
<span id="L442" rel="#L442">442</span>
<span id="L443" rel="#L443">443</span>
<span id="L444" rel="#L444">444</span>
<span id="L445" rel="#L445">445</span>
<span id="L446" rel="#L446">446</span>
<span id="L447" rel="#L447">447</span>
<span id="L448" rel="#L448">448</span>
<span id="L449" rel="#L449">449</span>
<span id="L450" rel="#L450">450</span>
<span id="L451" rel="#L451">451</span>
<span id="L452" rel="#L452">452</span>
<span id="L453" rel="#L453">453</span>
<span id="L454" rel="#L454">454</span>
<span id="L455" rel="#L455">455</span>
<span id="L456" rel="#L456">456</span>
<span id="L457" rel="#L457">457</span>
<span id="L458" rel="#L458">458</span>
<span id="L459" rel="#L459">459</span>
<span id="L460" rel="#L460">460</span>
<span id="L461" rel="#L461">461</span>
<span id="L462" rel="#L462">462</span>
<span id="L463" rel="#L463">463</span>
<span id="L464" rel="#L464">464</span>
<span id="L465" rel="#L465">465</span>
<span id="L466" rel="#L466">466</span>
<span id="L467" rel="#L467">467</span>
<span id="L468" rel="#L468">468</span>
<span id="L469" rel="#L469">469</span>
<span id="L470" rel="#L470">470</span>
<span id="L471" rel="#L471">471</span>
<span id="L472" rel="#L472">472</span>
<span id="L473" rel="#L473">473</span>
<span id="L474" rel="#L474">474</span>
<span id="L475" rel="#L475">475</span>
<span id="L476" rel="#L476">476</span>
<span id="L477" rel="#L477">477</span>
<span id="L478" rel="#L478">478</span>
<span id="L479" rel="#L479">479</span>
<span id="L480" rel="#L480">480</span>
<span id="L481" rel="#L481">481</span>
<span id="L482" rel="#L482">482</span>
<span id="L483" rel="#L483">483</span>
<span id="L484" rel="#L484">484</span>
<span id="L485" rel="#L485">485</span>
<span id="L486" rel="#L486">486</span>
<span id="L487" rel="#L487">487</span>
<span id="L488" rel="#L488">488</span>
<span id="L489" rel="#L489">489</span>
<span id="L490" rel="#L490">490</span>
<span id="L491" rel="#L491">491</span>
<span id="L492" rel="#L492">492</span>
<span id="L493" rel="#L493">493</span>
<span id="L494" rel="#L494">494</span>
<span id="L495" rel="#L495">495</span>
<span id="L496" rel="#L496">496</span>
<span id="L497" rel="#L497">497</span>
<span id="L498" rel="#L498">498</span>
<span id="L499" rel="#L499">499</span>
<span id="L500" rel="#L500">500</span>
<span id="L501" rel="#L501">501</span>
<span id="L502" rel="#L502">502</span>
<span id="L503" rel="#L503">503</span>
<span id="L504" rel="#L504">504</span>
<span id="L505" rel="#L505">505</span>
<span id="L506" rel="#L506">506</span>
<span id="L507" rel="#L507">507</span>
<span id="L508" rel="#L508">508</span>
<span id="L509" rel="#L509">509</span>
<span id="L510" rel="#L510">510</span>
<span id="L511" rel="#L511">511</span>
<span id="L512" rel="#L512">512</span>
<span id="L513" rel="#L513">513</span>
<span id="L514" rel="#L514">514</span>
<span id="L515" rel="#L515">515</span>
<span id="L516" rel="#L516">516</span>
<span id="L517" rel="#L517">517</span>
<span id="L518" rel="#L518">518</span>
<span id="L519" rel="#L519">519</span>
<span id="L520" rel="#L520">520</span>
<span id="L521" rel="#L521">521</span>
<span id="L522" rel="#L522">522</span>
<span id="L523" rel="#L523">523</span>
<span id="L524" rel="#L524">524</span>
<span id="L525" rel="#L525">525</span>
<span id="L526" rel="#L526">526</span>
<span id="L527" rel="#L527">527</span>
<span id="L528" rel="#L528">528</span>
<span id="L529" rel="#L529">529</span>
<span id="L530" rel="#L530">530</span>
<span id="L531" rel="#L531">531</span>
<span id="L532" rel="#L532">532</span>
<span id="L533" rel="#L533">533</span>
<span id="L534" rel="#L534">534</span>
<span id="L535" rel="#L535">535</span>
<span id="L536" rel="#L536">536</span>
<span id="L537" rel="#L537">537</span>
<span id="L538" rel="#L538">538</span>
<span id="L539" rel="#L539">539</span>
<span id="L540" rel="#L540">540</span>
<span id="L541" rel="#L541">541</span>
<span id="L542" rel="#L542">542</span>
<span id="L543" rel="#L543">543</span>
<span id="L544" rel="#L544">544</span>
<span id="L545" rel="#L545">545</span>
<span id="L546" rel="#L546">546</span>
<span id="L547" rel="#L547">547</span>
<span id="L548" rel="#L548">548</span>
<span id="L549" rel="#L549">549</span>
<span id="L550" rel="#L550">550</span>
<span id="L551" rel="#L551">551</span>
<span id="L552" rel="#L552">552</span>
<span id="L553" rel="#L553">553</span>
<span id="L554" rel="#L554">554</span>
<span id="L555" rel="#L555">555</span>
<span id="L556" rel="#L556">556</span>
<span id="L557" rel="#L557">557</span>
<span id="L558" rel="#L558">558</span>
<span id="L559" rel="#L559">559</span>
<span id="L560" rel="#L560">560</span>
<span id="L561" rel="#L561">561</span>
<span id="L562" rel="#L562">562</span>
<span id="L563" rel="#L563">563</span>
<span id="L564" rel="#L564">564</span>
<span id="L565" rel="#L565">565</span>
<span id="L566" rel="#L566">566</span>
<span id="L567" rel="#L567">567</span>
<span id="L568" rel="#L568">568</span>
<span id="L569" rel="#L569">569</span>
<span id="L570" rel="#L570">570</span>
<span id="L571" rel="#L571">571</span>
<span id="L572" rel="#L572">572</span>
<span id="L573" rel="#L573">573</span>
<span id="L574" rel="#L574">574</span>
<span id="L575" rel="#L575">575</span>
<span id="L576" rel="#L576">576</span>
<span id="L577" rel="#L577">577</span>
<span id="L578" rel="#L578">578</span>
<span id="L579" rel="#L579">579</span>
<span id="L580" rel="#L580">580</span>
<span id="L581" rel="#L581">581</span>
<span id="L582" rel="#L582">582</span>
<span id="L583" rel="#L583">583</span>
<span id="L584" rel="#L584">584</span>
<span id="L585" rel="#L585">585</span>
<span id="L586" rel="#L586">586</span>
<span id="L587" rel="#L587">587</span>
<span id="L588" rel="#L588">588</span>
<span id="L589" rel="#L589">589</span>
<span id="L590" rel="#L590">590</span>
<span id="L591" rel="#L591">591</span>
<span id="L592" rel="#L592">592</span>
<span id="L593" rel="#L593">593</span>
<span id="L594" rel="#L594">594</span>
<span id="L595" rel="#L595">595</span>
<span id="L596" rel="#L596">596</span>
<span id="L597" rel="#L597">597</span>
<span id="L598" rel="#L598">598</span>
<span id="L599" rel="#L599">599</span>
<span id="L600" rel="#L600">600</span>
<span id="L601" rel="#L601">601</span>
<span id="L602" rel="#L602">602</span>
<span id="L603" rel="#L603">603</span>
<span id="L604" rel="#L604">604</span>
<span id="L605" rel="#L605">605</span>
<span id="L606" rel="#L606">606</span>
<span id="L607" rel="#L607">607</span>
<span id="L608" rel="#L608">608</span>
<span id="L609" rel="#L609">609</span>
<span id="L610" rel="#L610">610</span>
<span id="L611" rel="#L611">611</span>
<span id="L612" rel="#L612">612</span>
<span id="L613" rel="#L613">613</span>
<span id="L614" rel="#L614">614</span>
<span id="L615" rel="#L615">615</span>
<span id="L616" rel="#L616">616</span>
<span id="L617" rel="#L617">617</span>
<span id="L618" rel="#L618">618</span>
<span id="L619" rel="#L619">619</span>
<span id="L620" rel="#L620">620</span>
<span id="L621" rel="#L621">621</span>
<span id="L622" rel="#L622">622</span>
<span id="L623" rel="#L623">623</span>
<span id="L624" rel="#L624">624</span>
<span id="L625" rel="#L625">625</span>
<span id="L626" rel="#L626">626</span>
<span id="L627" rel="#L627">627</span>
<span id="L628" rel="#L628">628</span>
<span id="L629" rel="#L629">629</span>
<span id="L630" rel="#L630">630</span>
<span id="L631" rel="#L631">631</span>
<span id="L632" rel="#L632">632</span>
<span id="L633" rel="#L633">633</span>
<span id="L634" rel="#L634">634</span>
<span id="L635" rel="#L635">635</span>
<span id="L636" rel="#L636">636</span>
<span id="L637" rel="#L637">637</span>
<span id="L638" rel="#L638">638</span>
<span id="L639" rel="#L639">639</span>
<span id="L640" rel="#L640">640</span>
<span id="L641" rel="#L641">641</span>
<span id="L642" rel="#L642">642</span>
<span id="L643" rel="#L643">643</span>
<span id="L644" rel="#L644">644</span>
<span id="L645" rel="#L645">645</span>
<span id="L646" rel="#L646">646</span>
<span id="L647" rel="#L647">647</span>
<span id="L648" rel="#L648">648</span>
<span id="L649" rel="#L649">649</span>
<span id="L650" rel="#L650">650</span>
<span id="L651" rel="#L651">651</span>
<span id="L652" rel="#L652">652</span>
<span id="L653" rel="#L653">653</span>
<span id="L654" rel="#L654">654</span>
<span id="L655" rel="#L655">655</span>
<span id="L656" rel="#L656">656</span>
<span id="L657" rel="#L657">657</span>
<span id="L658" rel="#L658">658</span>
<span id="L659" rel="#L659">659</span>
<span id="L660" rel="#L660">660</span>
<span id="L661" rel="#L661">661</span>
<span id="L662" rel="#L662">662</span>
<span id="L663" rel="#L663">663</span>
<span id="L664" rel="#L664">664</span>
<span id="L665" rel="#L665">665</span>
<span id="L666" rel="#L666">666</span>
<span id="L667" rel="#L667">667</span>
<span id="L668" rel="#L668">668</span>
<span id="L669" rel="#L669">669</span>
<span id="L670" rel="#L670">670</span>
<span id="L671" rel="#L671">671</span>
<span id="L672" rel="#L672">672</span>
<span id="L673" rel="#L673">673</span>
<span id="L674" rel="#L674">674</span>
<span id="L675" rel="#L675">675</span>
<span id="L676" rel="#L676">676</span>
<span id="L677" rel="#L677">677</span>
<span id="L678" rel="#L678">678</span>
<span id="L679" rel="#L679">679</span>
<span id="L680" rel="#L680">680</span>
<span id="L681" rel="#L681">681</span>
<span id="L682" rel="#L682">682</span>
<span id="L683" rel="#L683">683</span>
<span id="L684" rel="#L684">684</span>
<span id="L685" rel="#L685">685</span>
<span id="L686" rel="#L686">686</span>
<span id="L687" rel="#L687">687</span>
<span id="L688" rel="#L688">688</span>
<span id="L689" rel="#L689">689</span>
<span id="L690" rel="#L690">690</span>
<span id="L691" rel="#L691">691</span>
<span id="L692" rel="#L692">692</span>
<span id="L693" rel="#L693">693</span>
<span id="L694" rel="#L694">694</span>
<span id="L695" rel="#L695">695</span>
<span id="L696" rel="#L696">696</span>
<span id="L697" rel="#L697">697</span>
<span id="L698" rel="#L698">698</span>
<span id="L699" rel="#L699">699</span>
<span id="L700" rel="#L700">700</span>
<span id="L701" rel="#L701">701</span>
<span id="L702" rel="#L702">702</span>
<span id="L703" rel="#L703">703</span>
<span id="L704" rel="#L704">704</span>
<span id="L705" rel="#L705">705</span>
<span id="L706" rel="#L706">706</span>
<span id="L707" rel="#L707">707</span>
<span id="L708" rel="#L708">708</span>
<span id="L709" rel="#L709">709</span>
<span id="L710" rel="#L710">710</span>
<span id="L711" rel="#L711">711</span>
<span id="L712" rel="#L712">712</span>
<span id="L713" rel="#L713">713</span>
<span id="L714" rel="#L714">714</span>
<span id="L715" rel="#L715">715</span>
<span id="L716" rel="#L716">716</span>
<span id="L717" rel="#L717">717</span>
<span id="L718" rel="#L718">718</span>
<span id="L719" rel="#L719">719</span>
<span id="L720" rel="#L720">720</span>
<span id="L721" rel="#L721">721</span>
<span id="L722" rel="#L722">722</span>
<span id="L723" rel="#L723">723</span>
<span id="L724" rel="#L724">724</span>
<span id="L725" rel="#L725">725</span>
<span id="L726" rel="#L726">726</span>
<span id="L727" rel="#L727">727</span>
<span id="L728" rel="#L728">728</span>
<span id="L729" rel="#L729">729</span>
<span id="L730" rel="#L730">730</span>
<span id="L731" rel="#L731">731</span>
<span id="L732" rel="#L732">732</span>
<span id="L733" rel="#L733">733</span>
<span id="L734" rel="#L734">734</span>
<span id="L735" rel="#L735">735</span>
<span id="L736" rel="#L736">736</span>
<span id="L737" rel="#L737">737</span>
<span id="L738" rel="#L738">738</span>
<span id="L739" rel="#L739">739</span>
<span id="L740" rel="#L740">740</span>
<span id="L741" rel="#L741">741</span>
<span id="L742" rel="#L742">742</span>
<span id="L743" rel="#L743">743</span>
<span id="L744" rel="#L744">744</span>
<span id="L745" rel="#L745">745</span>
<span id="L746" rel="#L746">746</span>
<span id="L747" rel="#L747">747</span>
<span id="L748" rel="#L748">748</span>
<span id="L749" rel="#L749">749</span>
<span id="L750" rel="#L750">750</span>
<span id="L751" rel="#L751">751</span>
<span id="L752" rel="#L752">752</span>
<span id="L753" rel="#L753">753</span>
<span id="L754" rel="#L754">754</span>

            </td>
            <td class="blob-line-code"><div class="code-body highlight"><pre><div class='line' id='LC1'><span class="p">;(</span><span class="kd">function</span> <span class="p">(</span><span class="nx">$</span><span class="p">,</span> <span class="nb">window</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC2'>	<span class="s2">&quot;use strict&quot;</span><span class="p">;</span></div><div class='line' id='LC3'><br/></div><div class='line' id='LC4'>	<span class="cm">/**</span></div><div class='line' id='LC5'><span class="cm">	 * @options</span></div><div class='line' id='LC6'><span class="cm">	 * @param autoAdvance [boolean] &lt;false&gt; &quot;Flag to auto advance items&quot;</span></div><div class='line' id='LC7'><span class="cm">	 * @param autoTime [int] &lt;8000&gt; &quot;Auto advance time&quot;</span></div><div class='line' id='LC8'><span class="cm">	 * @param autoWidth [boolean] &lt;false&gt; &quot;Flag to fit items to viewport width&quot;</span></div><div class='line' id='LC9'><span class="cm">	 * @param controls [boolean] &lt;true&gt; &quot;Flag to draw controls&quot;</span></div><div class='line' id='LC10'><span class="cm">	 * @param customClass [string] &lt;&#39;&#39;&gt; &quot;Class applied to instance&quot;</span></div><div class='line' id='LC11'><span class="cm">	 * @param maxWidth [string] &lt;&#39;Infinity&#39;&gt; &quot;Width at which to auto-disable plugin&quot;</span></div><div class='line' id='LC12'><span class="cm">	 * @param minWidth [string] &lt;&#39;0&#39;&gt; &quot;Width at which to auto-disable plugin&quot;</span></div><div class='line' id='LC13'><span class="cm">	 * @param paged [boolean] &lt;false&gt; &quot;Flag for paged items&quot;</span></div><div class='line' id='LC14'><span class="cm">	 * @param pagination [boolean] &lt;true&gt; &quot;Flag to draw pagination&quot;</span></div><div class='line' id='LC15'><span class="cm">	 * @param single [boolean] &lt;false&gt; &quot;Flag for single items&quot;</span></div><div class='line' id='LC16'><span class="cm">	 * @param touchPaged [boolean] &lt;true&gt; &quot;Flag for paged touch interaction&quot;</span></div><div class='line' id='LC17'><span class="cm">	 * @param useMargin [boolean] &lt;false&gt; &quot;Use margins instead of css transitions (legacy browser support)&quot;</span></div><div class='line' id='LC18'><span class="cm">	 */</span></div><div class='line' id='LC19'>	<span class="kd">var</span> <span class="nx">options</span> <span class="o">=</span> <span class="p">{</span></div><div class='line' id='LC20'>		<span class="nx">autoAdvance</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC21'>		<span class="nx">autoTime</span><span class="o">:</span> <span class="mi">8000</span><span class="p">,</span></div><div class='line' id='LC22'>		<span class="nx">autoWidth</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC23'>		<span class="c1">//canister: true, * @param canister [boolean] &lt;true&gt; &quot;Flag to draw canister&quot;</span></div><div class='line' id='LC24'>		<span class="nx">controls</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span></div><div class='line' id='LC25'>		<span class="nx">customClass</span><span class="o">:</span> <span class="s2">&quot;&quot;</span><span class="p">,</span></div><div class='line' id='LC26'>		<span class="nx">infinite</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC27'>		<span class="nx">maxWidth</span><span class="o">:</span> <span class="kc">Infinity</span><span class="p">,</span></div><div class='line' id='LC28'>		<span class="nx">minWidth</span><span class="o">:</span> <span class="s1">&#39;0px&#39;</span><span class="p">,</span></div><div class='line' id='LC29'>		<span class="nx">paged</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC30'>		<span class="nx">pagination</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span></div><div class='line' id='LC31'>		<span class="nx">single</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC32'>		<span class="nx">touchPaged</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span></div><div class='line' id='LC33'>		<span class="nx">useMargin</span><span class="o">:</span> <span class="kc">false</span></div><div class='line' id='LC34'>		<span class="c1">//viewport: true * @param viewport [boolean] &lt;true&gt; &quot;Flag to draw viewport&quot;</span></div><div class='line' id='LC35'>	<span class="p">};</span></div><div class='line' id='LC36'><br/></div><div class='line' id='LC37'>	<span class="cm">/**</span></div><div class='line' id='LC38'><span class="cm">	 * @events</span></div><div class='line' id='LC39'><span class="cm">	 * @event update.roller &quot;Canister position updated&quot;</span></div><div class='line' id='LC40'><span class="cm">	 */</span></div><div class='line' id='LC41'><br/></div><div class='line' id='LC42'>	<span class="kd">var</span> <span class="nx">pub</span> <span class="o">=</span> <span class="p">{</span></div><div class='line' id='LC43'><br/></div><div class='line' id='LC44'>		<span class="cm">/**</span></div><div class='line' id='LC45'><span class="cm">		 * @method</span></div><div class='line' id='LC46'><span class="cm">		 * @name defaults</span></div><div class='line' id='LC47'><span class="cm">		 * @description Sets default plugin options</span></div><div class='line' id='LC48'><span class="cm">		 * @param opts [object] &lt;{}&gt; &quot;Options object&quot;</span></div><div class='line' id='LC49'><span class="cm">		 * @example $.roller(&quot;defaults&quot;, opts);</span></div><div class='line' id='LC50'><span class="cm">		 */</span></div><div class='line' id='LC51'>		<span class="nx">defaults</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">opts</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC52'>			<span class="nx">options</span> <span class="o">=</span> <span class="nx">$</span><span class="p">.</span><span class="nx">extend</span><span class="p">(</span><span class="nx">options</span><span class="p">,</span> <span class="nx">opts</span> <span class="o">||</span> <span class="p">{});</span></div><div class='line' id='LC53'>			<span class="k">return</span> <span class="nx">$</span><span class="p">(</span><span class="k">this</span><span class="p">);</span></div><div class='line' id='LC54'>		<span class="p">},</span></div><div class='line' id='LC55'><br/></div><div class='line' id='LC56'>		<span class="cm">/**</span></div><div class='line' id='LC57'><span class="cm">		 * @method</span></div><div class='line' id='LC58'><span class="cm">		 * @name destroy</span></div><div class='line' id='LC59'><span class="cm">		 * @description Removes instance of plugin</span></div><div class='line' id='LC60'><span class="cm">		 * @example $(&quot;.target&quot;).roller(&quot;destroy&quot;);</span></div><div class='line' id='LC61'><span class="cm">		 */</span></div><div class='line' id='LC62'>		<span class="nx">destroy</span><span class="o">:</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC63'>			<span class="k">return</span> <span class="nx">$</span><span class="p">(</span><span class="k">this</span><span class="p">).</span><span class="nx">each</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC64'>				<span class="kd">var</span> <span class="nx">data</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="k">this</span><span class="p">).</span><span class="nx">data</span><span class="p">(</span><span class="s2">&quot;roller&quot;</span><span class="p">);</span></div><div class='line' id='LC65'><br/></div><div class='line' id='LC66'>				<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC67'>					<span class="nx">_clearTimer</span><span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">autoTimer</span><span class="p">);</span></div><div class='line' id='LC68'><br/></div><div class='line' id='LC69'>					<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">data</span><span class="p">.</span><span class="nx">single</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC70'>						<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">viewport</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC71'>							<span class="nx">data</span><span class="p">.</span><span class="nx">$items</span><span class="p">.</span><span class="nx">unwrap</span><span class="p">();</span></div><div class='line' id='LC72'>						<span class="p">}</span></div><div class='line' id='LC73'>						<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">canister</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC74'>							<span class="nx">data</span><span class="p">.</span><span class="nx">$items</span><span class="p">.</span><span class="nx">unwrap</span><span class="p">();</span></div><div class='line' id='LC75'>						<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC76'>							<span class="nx">data</span><span class="p">.</span><span class="nx">$canister</span><span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s2">&quot;style&quot;</span><span class="p">,</span> <span class="kc">null</span><span class="p">);</span></div><div class='line' id='LC77'>						<span class="p">}</span></div><div class='line' id='LC78'>					<span class="p">}</span></div><div class='line' id='LC79'><br/></div><div class='line' id='LC80'>					<span class="nx">data</span><span class="p">.</span><span class="nx">$items</span><span class="p">.</span><span class="nx">removeClass</span><span class="p">(</span><span class="s2">&quot;visible&quot;</span><span class="p">);</span></div><div class='line' id='LC81'><br/></div><div class='line' id='LC82'>					<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">pagination</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC83'>						<span class="nx">data</span><span class="p">.</span><span class="nx">$pagination</span><span class="p">.</span><span class="nx">remove</span><span class="p">();</span></div><div class='line' id='LC84'>					<span class="p">}</span></div><div class='line' id='LC85'>					<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">controls</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC86'>						<span class="nx">data</span><span class="p">.</span><span class="nx">$controls</span><span class="p">.</span><span class="nx">remove</span><span class="p">();</span></div><div class='line' id='LC87'>					<span class="p">}</span></div><div class='line' id='LC88'><br/></div><div class='line' id='LC89'>					<span class="nx">data</span><span class="p">.</span><span class="nx">$roller</span><span class="p">.</span><span class="nx">removeClass</span><span class="p">(</span><span class="s2">&quot;roller enabled &quot;</span> <span class="o">+</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">single</span> <span class="o">?</span> <span class="s2">&quot;single &quot;</span> <span class="o">:</span> <span class="s2">&quot;&quot;</span><span class="p">)</span> <span class="o">+</span> <span class="nx">data</span><span class="p">.</span><span class="nx">customClass</span><span class="p">)</span></div><div class='line' id='LC90'>								<span class="p">.</span><span class="nx">off</span><span class="p">(</span><span class="s2">&quot;.roller&quot;</span><span class="p">)</span></div><div class='line' id='LC91'>								<span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="s2">&quot;roller&quot;</span><span class="p">,</span> <span class="kc">null</span><span class="p">);</span></div><div class='line' id='LC92'>				<span class="p">}</span></div><div class='line' id='LC93'>			<span class="p">});</span></div><div class='line' id='LC94'>		<span class="p">},</span></div><div class='line' id='LC95'><br/></div><div class='line' id='LC96'>		<span class="cm">/**</span></div><div class='line' id='LC97'><span class="cm">		 * @method</span></div><div class='line' id='LC98'><span class="cm">		 * @name disable</span></div><div class='line' id='LC99'><span class="cm">		 * @description Disables instance of plugin</span></div><div class='line' id='LC100'><span class="cm">		 * @example $(&quot;.target&quot;).roller(&quot;disable&quot;);</span></div><div class='line' id='LC101'><span class="cm">		 */</span></div><div class='line' id='LC102'>		<span class="nx">disable</span><span class="o">:</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC103'>			<span class="k">return</span> <span class="nx">$</span><span class="p">(</span><span class="k">this</span><span class="p">).</span><span class="nx">each</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC104'>				<span class="kd">var</span> <span class="nx">data</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="k">this</span><span class="p">).</span><span class="nx">data</span><span class="p">(</span><span class="s2">&quot;roller&quot;</span><span class="p">);</span></div><div class='line' id='LC105'><br/></div><div class='line' id='LC106'>				<span class="k">if</span> <span class="p">(</span><span class="nx">data</span> <span class="o">&amp;&amp;</span> <span class="nx">data</span><span class="p">.</span><span class="nx">enabled</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC107'>					<span class="nx">_clearTimer</span><span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">autoTimer</span><span class="p">);</span></div><div class='line' id='LC108'><br/></div><div class='line' id='LC109'>					<span class="nx">data</span><span class="p">.</span><span class="nx">enabled</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC110'><br/></div><div class='line' id='LC111'>					<span class="nx">data</span><span class="p">.</span><span class="nx">$roller</span><span class="p">.</span><span class="nx">removeClass</span><span class="p">(</span><span class="s2">&quot;enabled&quot;</span><span class="p">)</span></div><div class='line' id='LC112'>								<span class="p">.</span><span class="nx">off</span><span class="p">(</span><span class="s2">&quot;touchstart.roller click.roller&quot;</span><span class="p">);</span></div><div class='line' id='LC113'><br/></div><div class='line' id='LC114'>					<span class="nx">data</span><span class="p">.</span><span class="nx">$canister</span><span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s2">&quot;style&quot;</span><span class="p">,</span> <span class="s2">&quot;&quot;</span><span class="p">)</span></div><div class='line' id='LC115'>								  <span class="p">.</span><span class="nx">css</span><span class="p">(</span> <span class="nx">_prefix</span><span class="p">(</span><span class="s2">&quot;transition&quot;</span><span class="p">,</span> <span class="s2">&quot;none&quot;</span><span class="p">)</span> <span class="p">)</span></div><div class='line' id='LC116'>								  <span class="p">.</span><span class="nx">off</span><span class="p">(</span><span class="s2">&quot;touchstart.roller&quot;</span><span class="p">);</span></div><div class='line' id='LC117'><br/></div><div class='line' id='LC118'>					<span class="nx">data</span><span class="p">.</span><span class="nx">$controls</span><span class="p">.</span><span class="nx">removeClass</span><span class="p">(</span><span class="s2">&quot;visible&quot;</span><span class="p">);</span></div><div class='line' id='LC119'>					<span class="nx">data</span><span class="p">.</span><span class="nx">$pagination</span><span class="p">.</span><span class="nx">removeClass</span><span class="p">(</span><span class="s2">&quot;visible&quot;</span><span class="p">)</span></div><div class='line' id='LC120'>									<span class="p">.</span><span class="nx">html</span><span class="p">(</span><span class="s2">&quot;&quot;</span><span class="p">);</span></div><div class='line' id='LC121'><br/></div><div class='line' id='LC122'>					<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">useMargin</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC123'>						<span class="nx">data</span><span class="p">.</span><span class="nx">$canister</span><span class="p">.</span><span class="nx">css</span><span class="p">({</span> <span class="nx">marginLeft</span><span class="o">:</span> <span class="s2">&quot;&quot;</span> <span class="p">});</span></div><div class='line' id='LC124'>					<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC125'>						<span class="nx">data</span><span class="p">.</span><span class="nx">$canister</span><span class="p">.</span><span class="nx">css</span><span class="p">(</span> <span class="nx">_prefix</span><span class="p">(</span><span class="s2">&quot;transform&quot;</span><span class="p">,</span> <span class="s2">&quot;translate3d(0px, 0, 0)&quot;</span><span class="p">)</span> <span class="p">);</span></div><div class='line' id='LC126'>					<span class="p">}</span></div><div class='line' id='LC127'><br/></div><div class='line' id='LC128'>					<span class="nx">data</span><span class="p">.</span><span class="nx">index</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span></div><div class='line' id='LC129'>				<span class="p">}</span></div><div class='line' id='LC130'>			<span class="p">});</span></div><div class='line' id='LC131'>		<span class="p">},</span></div><div class='line' id='LC132'><br/></div><div class='line' id='LC133'>		<span class="cm">/**</span></div><div class='line' id='LC134'><span class="cm">		 * @method</span></div><div class='line' id='LC135'><span class="cm">		 * @name enable</span></div><div class='line' id='LC136'><span class="cm">		 * @description Enables instance of plugin</span></div><div class='line' id='LC137'><span class="cm">		 * @example $(&quot;.target&quot;).roller(&quot;enable&quot;);</span></div><div class='line' id='LC138'><span class="cm">		 */</span></div><div class='line' id='LC139'>		<span class="nx">enable</span><span class="o">:</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC140'>			<span class="k">return</span> <span class="nx">$</span><span class="p">(</span><span class="k">this</span><span class="p">).</span><span class="nx">each</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC141'>				<span class="kd">var</span> <span class="nx">data</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="k">this</span><span class="p">).</span><span class="nx">data</span><span class="p">(</span><span class="s2">&quot;roller&quot;</span><span class="p">);</span></div><div class='line' id='LC142'><br/></div><div class='line' id='LC143'>				<span class="k">if</span> <span class="p">(</span><span class="nx">data</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="nx">data</span><span class="p">.</span><span class="nx">enabled</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC144'>					<span class="nx">data</span><span class="p">.</span><span class="nx">enabled</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC145'><br/></div><div class='line' id='LC146'>					<span class="nx">data</span><span class="p">.</span><span class="nx">$roller</span><span class="p">.</span><span class="nx">addClass</span><span class="p">(</span><span class="s2">&quot;enabled&quot;</span><span class="p">)</span></div><div class='line' id='LC147'>								<span class="p">.</span><span class="nx">on</span><span class="p">(</span><span class="s2">&quot;touchstart.roller click.roller&quot;</span><span class="p">,</span> <span class="s2">&quot;.roller-control&quot;</span><span class="p">,</span> <span class="nx">data</span><span class="p">,</span> <span class="nx">_onAdvance</span><span class="p">)</span></div><div class='line' id='LC148'>								<span class="p">.</span><span class="nx">on</span><span class="p">(</span><span class="s2">&quot;touchstart.roller click.roller&quot;</span><span class="p">,</span> <span class="s2">&quot;.roller-page&quot;</span><span class="p">,</span> <span class="nx">data</span><span class="p">,</span> <span class="nx">_onSelect</span><span class="p">);</span></div><div class='line' id='LC149'><br/></div><div class='line' id='LC150'>					<span class="nx">data</span><span class="p">.</span><span class="nx">$canister</span><span class="p">.</span><span class="nx">css</span><span class="p">(</span> <span class="nx">_prefix</span><span class="p">(</span><span class="s2">&quot;transition&quot;</span><span class="p">,</span> <span class="s2">&quot;&quot;</span><span class="p">)</span> <span class="p">);</span></div><div class='line' id='LC151'><br/></div><div class='line' id='LC152'>					<span class="nx">pub</span><span class="p">.</span><span class="nx">resize</span><span class="p">.</span><span class="nx">apply</span><span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">$roller</span><span class="p">);</span></div><div class='line' id='LC153'><br/></div><div class='line' id='LC154'>					<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">data</span><span class="p">.</span><span class="nx">single</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC155'>						<span class="nx">data</span><span class="p">.</span><span class="nx">$canister</span><span class="p">.</span><span class="nx">on</span><span class="p">(</span><span class="s2">&quot;touchstart.roller&quot;</span><span class="p">,</span> <span class="nx">data</span><span class="p">,</span> <span class="nx">_onTouchStart</span><span class="p">);</span></div><div class='line' id='LC156'>					<span class="p">}</span></div><div class='line' id='LC157'>				<span class="p">}</span></div><div class='line' id='LC158'>			<span class="p">});</span></div><div class='line' id='LC159'>		<span class="p">},</span></div><div class='line' id='LC160'><br/></div><div class='line' id='LC161'>		<span class="cm">/**</span></div><div class='line' id='LC162'><span class="cm">		 * @method</span></div><div class='line' id='LC163'><span class="cm">		 * @name jump</span></div><div class='line' id='LC164'><span class="cm">		 * @description Jump instance of plugin to specific page</span></div><div class='line' id='LC165'><span class="cm">		 * @example $(&quot;.target&quot;).roller(&quot;jump&quot;, 1);</span></div><div class='line' id='LC166'><span class="cm">		 */</span></div><div class='line' id='LC167'>		<span class="nx">jump</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">index</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC168'>			<span class="k">return</span> <span class="nx">$</span><span class="p">(</span><span class="k">this</span><span class="p">).</span><span class="nx">each</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC169'>				<span class="kd">var</span> <span class="nx">data</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="k">this</span><span class="p">).</span><span class="nx">data</span><span class="p">(</span><span class="s2">&quot;roller&quot;</span><span class="p">);</span></div><div class='line' id='LC170'><br/></div><div class='line' id='LC171'>				<span class="k">if</span> <span class="p">(</span><span class="nx">data</span> <span class="o">&amp;&amp;</span> <span class="nx">data</span><span class="p">.</span><span class="nx">enabled</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC172'>					<span class="nx">_clearTimer</span><span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">autoTimer</span><span class="p">);</span></div><div class='line' id='LC173'>					<span class="nx">_position</span><span class="p">(</span><span class="nx">data</span><span class="p">,</span> <span class="nx">index</span><span class="o">-</span><span class="mi">1</span><span class="p">);</span></div><div class='line' id='LC174'>				<span class="p">}</span></div><div class='line' id='LC175'>			<span class="p">});</span></div><div class='line' id='LC176'>		<span class="p">},</span></div><div class='line' id='LC177'><br/></div><div class='line' id='LC178'>		<span class="cm">/**</span></div><div class='line' id='LC179'><span class="cm">		 * @method</span></div><div class='line' id='LC180'><span class="cm">		 * @name resize</span></div><div class='line' id='LC181'><span class="cm">		 * @description Resizes each instance</span></div><div class='line' id='LC182'><span class="cm">		 * @example $(&quot;.target&quot;).roller(&quot;resize&quot;);</span></div><div class='line' id='LC183'><span class="cm">		 */</span></div><div class='line' id='LC184'>		<span class="nx">resize</span><span class="o">:</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC185'>			<span class="k">return</span> <span class="nx">$</span><span class="p">(</span><span class="k">this</span><span class="p">).</span><span class="nx">each</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC186'>				<span class="kd">var</span> <span class="nx">data</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="k">this</span><span class="p">).</span><span class="nx">data</span><span class="p">(</span><span class="s2">&quot;roller&quot;</span><span class="p">);</span></div><div class='line' id='LC187'><br/></div><div class='line' id='LC188'>				<span class="k">if</span> <span class="p">(</span><span class="nx">data</span> <span class="o">&amp;&amp;</span> <span class="nx">data</span><span class="p">.</span><span class="nx">enabled</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC189'>					<span class="nx">data</span><span class="p">.</span><span class="nx">count</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">$items</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span></div><div class='line' id='LC190'>					<span class="nx">data</span><span class="p">.</span><span class="nx">viewportWidth</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">$viewport</span><span class="p">.</span><span class="nx">outerWidth</span><span class="p">(</span><span class="kc">false</span><span class="p">);</span></div><div class='line' id='LC191'>					<span class="nx">data</span><span class="p">.</span><span class="nx">itemMargin</span> <span class="o">=</span> <span class="nb">parseInt</span><span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">$items</span><span class="p">.</span><span class="nx">eq</span><span class="p">(</span><span class="mi">0</span><span class="p">).</span><span class="nx">css</span><span class="p">(</span><span class="s2">&quot;margin-left&quot;</span><span class="p">),</span> <span class="mi">10</span><span class="p">)</span> <span class="o">+</span> <span class="nb">parseInt</span><span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">$items</span><span class="p">.</span><span class="nx">eq</span><span class="p">(</span><span class="mi">0</span><span class="p">).</span><span class="nx">css</span><span class="p">(</span><span class="s2">&quot;margin-right&quot;</span><span class="p">),</span> <span class="mi">10</span><span class="p">);</span></div><div class='line' id='LC192'><br/></div><div class='line' id='LC193'>					<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">autoWidth</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC194'>						<span class="nx">data</span><span class="p">.</span><span class="nx">$items</span><span class="p">.</span><span class="nx">css</span><span class="p">({</span> <span class="nx">width</span><span class="o">:</span> <span class="nx">data</span><span class="p">.</span><span class="nx">viewportWidth</span> <span class="p">});</span></div><div class='line' id='LC195'>					<span class="p">}</span></div><div class='line' id='LC196'><br/></div><div class='line' id='LC197'>					<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">single</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC198'>						<span class="nx">data</span><span class="p">.</span><span class="nx">perPage</span> <span class="o">=</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC199'>						<span class="nx">data</span><span class="p">.</span><span class="nx">pageCount</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">count</span> <span class="o">-</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC200'>					<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">paged</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC201'>						<span class="nx">data</span><span class="p">.</span><span class="nx">canisterWidth</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span></div><div class='line' id='LC202'>						<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">data</span><span class="p">.</span><span class="nx">count</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC203'>							<span class="nx">data</span><span class="p">.</span><span class="nx">canisterWidth</span> <span class="o">+=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">$items</span><span class="p">.</span><span class="nx">eq</span><span class="p">(</span><span class="nx">i</span><span class="p">).</span><span class="nx">outerWidth</span><span class="p">()</span> <span class="o">+</span> <span class="nx">data</span><span class="p">.</span><span class="nx">itemMargin</span><span class="p">;</span></div><div class='line' id='LC204'>						<span class="p">}</span></div><div class='line' id='LC205'>						<span class="nx">data</span><span class="p">.</span><span class="nx">perPage</span> <span class="o">=</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC206'>						<span class="nx">data</span><span class="p">.</span><span class="nx">pageCount</span> <span class="o">=</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">canisterWidth</span> <span class="o">&gt;</span> <span class="nx">data</span><span class="p">.</span><span class="nx">viewportWidth</span><span class="p">)</span> <span class="o">?</span> <span class="nx">data</span><span class="p">.</span><span class="nx">count</span> <span class="o">-</span> <span class="mi">1</span> <span class="o">:</span> <span class="mi">0</span><span class="p">;</span></div><div class='line' id='LC207'>					<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC208'>						<span class="nx">data</span><span class="p">.</span><span class="nx">itemWidth</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">$items</span><span class="p">.</span><span class="nx">eq</span><span class="p">(</span><span class="mi">0</span><span class="p">).</span><span class="nx">outerWidth</span><span class="p">(</span><span class="kc">false</span><span class="p">)</span> <span class="o">+</span> <span class="nx">data</span><span class="p">.</span><span class="nx">itemMargin</span><span class="p">;</span></div><div class='line' id='LC209'>						<span class="nx">data</span><span class="p">.</span><span class="nx">perPage</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">floor</span><span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">viewportWidth</span> <span class="o">/</span> <span class="nx">data</span><span class="p">.</span><span class="nx">itemWidth</span><span class="p">);</span></div><div class='line' id='LC210'>						<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">perPage</span> <span class="o">&lt;</span> <span class="mi">1</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC211'>							<span class="nx">data</span><span class="p">.</span><span class="nx">perPage</span> <span class="o">=</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC212'>						<span class="p">}</span></div><div class='line' id='LC213'>						<span class="nx">data</span><span class="p">.</span><span class="nx">pageCount</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">ceil</span><span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">count</span> <span class="o">/</span> <span class="nx">data</span><span class="p">.</span><span class="nx">perPage</span><span class="p">)</span> <span class="o">-</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC214'>						<span class="nx">data</span><span class="p">.</span><span class="nx">pageMove</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">itemWidth</span> <span class="o">*</span> <span class="nx">data</span><span class="p">.</span><span class="nx">perPage</span><span class="p">;</span></div><div class='line' id='LC215'>						<span class="nx">data</span><span class="p">.</span><span class="nx">canisterWidth</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">itemWidth</span> <span class="o">*</span> <span class="nx">data</span><span class="p">.</span><span class="nx">count</span><span class="p">;</span></div><div class='line' id='LC216'>					<span class="p">}</span></div><div class='line' id='LC217'><br/></div><div class='line' id='LC218'>					<span class="nx">data</span><span class="p">.</span><span class="nx">maxMove</span> <span class="o">=</span> <span class="o">-</span><span class="nx">data</span><span class="p">.</span><span class="nx">canisterWidth</span> <span class="o">+</span> <span class="nx">data</span><span class="p">.</span><span class="nx">viewportWidth</span> <span class="o">+</span> <span class="nx">data</span><span class="p">.</span><span class="nx">itemMargin</span><span class="p">;</span></div><div class='line' id='LC219'>					<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">maxMove</span> <span class="o">&gt;</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC220'>						<span class="nx">data</span><span class="p">.</span><span class="nx">maxMove</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span></div><div class='line' id='LC221'>					<span class="p">}</span></div><div class='line' id='LC222'><br/></div><div class='line' id='LC223'>					<span class="c1">// Reset Page Count</span></div><div class='line' id='LC224'>					<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">pageCount</span> <span class="o">!==</span> <span class="s2">&quot;Infinity&quot;</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC225'>						<span class="kd">var</span> <span class="nx">html</span> <span class="o">=</span> <span class="s1">&#39;&#39;</span><span class="p">;</span></div><div class='line' id='LC226'>						<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">j</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">j</span> <span class="o">&lt;=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">pageCount</span><span class="p">;</span> <span class="nx">j</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC227'>							<span class="nx">html</span> <span class="o">+=</span> <span class="s1">&#39;&lt;span class=&quot;roller-page&quot;&gt;&#39;</span> <span class="o">+</span> <span class="p">(</span><span class="nx">j</span> <span class="o">+</span> <span class="mi">1</span><span class="p">)</span> <span class="o">+</span> <span class="s1">&#39;&lt;/span&gt;&#39;</span><span class="p">;</span></div><div class='line' id='LC228'>						<span class="p">}</span></div><div class='line' id='LC229'>						<span class="nx">data</span><span class="p">.</span><span class="nx">$pagination</span><span class="p">.</span><span class="nx">html</span><span class="p">(</span><span class="nx">html</span><span class="p">);</span></div><div class='line' id='LC230'>					<span class="p">}</span></div><div class='line' id='LC231'><br/></div><div class='line' id='LC232'>					<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">pageCount</span> <span class="o">&lt;</span> <span class="mi">1</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC233'>						<span class="nx">data</span><span class="p">.</span><span class="nx">$controls</span><span class="p">.</span><span class="nx">removeClass</span><span class="p">(</span><span class="s2">&quot;visible&quot;</span><span class="p">);</span></div><div class='line' id='LC234'>						<span class="nx">data</span><span class="p">.</span><span class="nx">$pagination</span><span class="p">.</span><span class="nx">removeClass</span><span class="p">(</span><span class="s2">&quot;visible&quot;</span><span class="p">);</span></div><div class='line' id='LC235'>					<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC236'>						<span class="nx">data</span><span class="p">.</span><span class="nx">$controls</span><span class="p">.</span><span class="nx">addClass</span><span class="p">(</span><span class="s2">&quot;visible&quot;</span><span class="p">);</span></div><div class='line' id='LC237'>						<span class="nx">data</span><span class="p">.</span><span class="nx">$pagination</span><span class="p">.</span><span class="nx">addClass</span><span class="p">(</span><span class="s2">&quot;visible&quot;</span><span class="p">);</span></div><div class='line' id='LC238'>					<span class="p">}</span></div><div class='line' id='LC239'>					<span class="nx">data</span><span class="p">.</span><span class="nx">$paginationItems</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">$roller</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s2">&quot;.roller-page&quot;</span><span class="p">);</span></div><div class='line' id='LC240'><br/></div><div class='line' id='LC241'>					<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">data</span><span class="p">.</span><span class="nx">single</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC242'>						<span class="nx">data</span><span class="p">.</span><span class="nx">$canister</span><span class="p">.</span><span class="nx">css</span><span class="p">({</span> <span class="nx">width</span><span class="o">:</span> <span class="nx">data</span><span class="p">.</span><span class="nx">canisterWidth</span> <span class="p">});</span></div><div class='line' id='LC243'>					<span class="p">}</span></div><div class='line' id='LC244'><br/></div><div class='line' id='LC245'>					<span class="nx">_position</span><span class="p">(</span><span class="nx">data</span><span class="p">,</span> <span class="nx">_calculateIndex</span><span class="p">(</span><span class="nx">data</span><span class="p">),</span> <span class="kc">false</span><span class="p">);</span></div><div class='line' id='LC246'>				<span class="p">}</span></div><div class='line' id='LC247'>			<span class="p">});</span></div><div class='line' id='LC248'>		<span class="p">},</span></div><div class='line' id='LC249'><br/></div><div class='line' id='LC250'>		<span class="cm">/**</span></div><div class='line' id='LC251'><span class="cm">		 * @method</span></div><div class='line' id='LC252'><span class="cm">		 * @name reset</span></div><div class='line' id='LC253'><span class="cm">		 * @description Resets instance after item change</span></div><div class='line' id='LC254'><span class="cm">		 * @example $(&quot;.target&quot;).roller(&quot;reset&quot;);</span></div><div class='line' id='LC255'><span class="cm">		 */</span></div><div class='line' id='LC256'>		<span class="nx">reset</span><span class="o">:</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC257'>			<span class="k">return</span> <span class="nx">$</span><span class="p">(</span><span class="k">this</span><span class="p">).</span><span class="nx">each</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC258'>				<span class="kd">var</span> <span class="nx">data</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="k">this</span><span class="p">).</span><span class="nx">data</span><span class="p">(</span><span class="s2">&quot;roller&quot;</span><span class="p">);</span></div><div class='line' id='LC259'><br/></div><div class='line' id='LC260'>				<span class="k">if</span> <span class="p">(</span><span class="nx">data</span> <span class="o">&amp;&amp;</span> <span class="nx">data</span><span class="p">.</span><span class="nx">enabled</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC261'>					<span class="nx">data</span><span class="p">.</span><span class="nx">$items</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">$roller</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s2">&quot;.roller-item&quot;</span><span class="p">);</span></div><div class='line' id='LC262'>					<span class="nx">pub</span><span class="p">.</span><span class="nx">resize</span><span class="p">.</span><span class="nx">apply</span><span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">$roller</span><span class="p">);</span></div><div class='line' id='LC263'>				<span class="p">}</span></div><div class='line' id='LC264'>			<span class="p">});</span></div><div class='line' id='LC265'>		<span class="p">}</span></div><div class='line' id='LC266'>	<span class="p">};</span></div><div class='line' id='LC267'><br/></div><div class='line' id='LC268'>	<span class="cm">/**</span></div><div class='line' id='LC269'><span class="cm">	 * @method private</span></div><div class='line' id='LC270'><span class="cm">	 * @name _init</span></div><div class='line' id='LC271'><span class="cm">	 * @description Initializes plugin</span></div><div class='line' id='LC272'><span class="cm">	 * @param opts [object] &quot;Initialization options&quot;</span></div><div class='line' id='LC273'><span class="cm">	 */</span></div><div class='line' id='LC274'>	<span class="kd">function</span> <span class="nx">_init</span><span class="p">(</span><span class="nx">opts</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC275'>		<span class="c1">// Settings</span></div><div class='line' id='LC276'>		<span class="nx">opts</span> <span class="o">=</span> <span class="nx">$</span><span class="p">.</span><span class="nx">extend</span><span class="p">({},</span> <span class="nx">options</span><span class="p">,</span> <span class="nx">opts</span><span class="p">);</span></div><div class='line' id='LC277'><br/></div><div class='line' id='LC278'>		<span class="c1">// Apply to each element</span></div><div class='line' id='LC279'>		<span class="kd">var</span> <span class="nx">$items</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="k">this</span><span class="p">);</span></div><div class='line' id='LC280'>		<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">count</span> <span class="o">=</span> <span class="nx">$items</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">count</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC281'>			<span class="nx">_build</span><span class="p">(</span><span class="nx">$items</span><span class="p">.</span><span class="nx">eq</span><span class="p">(</span><span class="nx">i</span><span class="p">),</span> <span class="nx">opts</span><span class="p">);</span></div><div class='line' id='LC282'>		<span class="p">}</span></div><div class='line' id='LC283'><br/></div><div class='line' id='LC284'>		<span class="k">return</span> <span class="nx">$items</span><span class="p">;</span></div><div class='line' id='LC285'>	<span class="p">}</span></div><div class='line' id='LC286'><br/></div><div class='line' id='LC287'>	<span class="cm">/**</span></div><div class='line' id='LC288'><span class="cm">	 * @method private</span></div><div class='line' id='LC289'><span class="cm">	 * @name _build</span></div><div class='line' id='LC290'><span class="cm">	 * @description Builds each instance</span></div><div class='line' id='LC291'><span class="cm">	 * @param $roller [jQuery object] &quot;Target jQuery object&quot;</span></div><div class='line' id='LC292'><span class="cm">	 * @param opts [object] &lt;{}&gt; &quot;Options object&quot;</span></div><div class='line' id='LC293'><span class="cm">	 */</span></div><div class='line' id='LC294'>	<span class="kd">function</span> <span class="nx">_build</span><span class="p">(</span><span class="nx">$roller</span><span class="p">,</span> <span class="nx">opts</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC295'>		<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">$roller</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="s2">&quot;roller&quot;</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC296'>			<span class="nx">opts</span> <span class="o">=</span> <span class="nx">$</span><span class="p">.</span><span class="nx">extend</span><span class="p">({},</span> <span class="nx">opts</span><span class="p">,</span> <span class="nx">$roller</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="s2">&quot;roller-options&quot;</span><span class="p">));</span></div><div class='line' id='LC297'><br/></div><div class='line' id='LC298'>			<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">opts</span><span class="p">.</span><span class="nx">single</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC299'>				<span class="c1">// Verify viewport and canister are available</span></div><div class='line' id='LC300'>				<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">$roller</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s2">&quot;.roller-canister&quot;</span><span class="p">).</span><span class="nx">length</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC301'>					<span class="nx">$roller</span><span class="p">.</span><span class="nx">wrapInner</span><span class="p">(</span><span class="s1">&#39;&lt;div class=&quot;roller-canister&quot;&gt;&lt;/div&gt;&#39;</span><span class="p">);</span></div><div class='line' id='LC302'>					<span class="nx">opts</span><span class="p">.</span><span class="nx">canister</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC303'>				<span class="p">}</span></div><div class='line' id='LC304'>				<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">$roller</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s2">&quot;.roller-viewport&quot;</span><span class="p">).</span><span class="nx">length</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC305'>					<span class="nx">$roller</span><span class="p">.</span><span class="nx">wrapInner</span><span class="p">(</span><span class="s1">&#39;&lt;div class=&quot;roller-viewport&quot;&gt;&lt;/div&gt;&#39;</span><span class="p">);</span></div><div class='line' id='LC306'>					<span class="nx">opts</span><span class="p">.</span><span class="nx">viewport</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC307'>				<span class="p">}</span></div><div class='line' id='LC308'>			<span class="p">}</span></div><div class='line' id='LC309'><br/></div><div class='line' id='LC310'>			<span class="c1">// Build controls and pagination</span></div><div class='line' id='LC311'>			<span class="kd">var</span> <span class="nx">html</span> <span class="o">=</span> <span class="s1">&#39;&#39;</span><span class="p">;</span></div><div class='line' id='LC312'>			<span class="k">if</span> <span class="p">(</span><span class="nx">opts</span><span class="p">.</span><span class="nx">controls</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="nx">$roller</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s2">&quot;.roller-controls&quot;</span><span class="p">).</span><span class="nx">length</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC313'>				<span class="nx">html</span> <span class="o">+=</span> <span class="s1">&#39;&lt;div class=&quot;roller-controls&quot;&gt;&#39;</span><span class="p">;</span></div><div class='line' id='LC314'>				<span class="nx">html</span> <span class="o">+=</span> <span class="s1">&#39;&lt;span class=&quot;roller-control previous&quot;&gt;Previous&lt;/span&gt;&#39;</span><span class="p">;</span></div><div class='line' id='LC315'>				<span class="nx">html</span> <span class="o">+=</span> <span class="s1">&#39;&lt;span class=&quot;roller-control next&quot;&gt;Next&lt;/span&gt;&#39;</span><span class="p">;</span></div><div class='line' id='LC316'>				<span class="nx">html</span> <span class="o">+=</span> <span class="s1">&#39;&lt;/div&gt;&#39;</span><span class="p">;</span></div><div class='line' id='LC317'>			<span class="p">}</span></div><div class='line' id='LC318'>			<span class="k">if</span> <span class="p">(</span><span class="nx">opts</span><span class="p">.</span><span class="nx">pagination</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="nx">$roller</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s2">&quot;.roller-pagination&quot;</span><span class="p">).</span><span class="nx">length</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC319'>				<span class="nx">html</span> <span class="o">+=</span> <span class="s1">&#39;&lt;div class=&quot;roller-pagination&quot;&gt;&#39;</span><span class="p">;</span></div><div class='line' id='LC320'>				<span class="nx">html</span> <span class="o">+=</span> <span class="s1">&#39;&lt;/div&gt;&#39;</span><span class="p">;</span></div><div class='line' id='LC321'>			<span class="p">}</span></div><div class='line' id='LC322'><br/></div><div class='line' id='LC323'>			<span class="c1">// Modify target</span></div><div class='line' id='LC324'>			<span class="nx">$roller</span><span class="p">.</span><span class="nx">addClass</span><span class="p">(</span><span class="s2">&quot;roller &quot;</span> <span class="o">+</span> <span class="p">(</span><span class="nx">opts</span><span class="p">.</span><span class="nx">single</span> <span class="o">?</span> <span class="s2">&quot;single &quot;</span> <span class="o">:</span> <span class="s2">&quot;&quot;</span><span class="p">)</span> <span class="o">+</span> <span class="nx">opts</span><span class="p">.</span><span class="nx">customClass</span><span class="p">)</span></div><div class='line' id='LC325'>				   <span class="p">.</span><span class="nx">append</span><span class="p">(</span><span class="nx">html</span><span class="p">);</span></div><div class='line' id='LC326'><br/></div><div class='line' id='LC327'>			<span class="kd">var</span> <span class="nx">data</span> <span class="o">=</span> <span class="nx">$</span><span class="p">.</span><span class="nx">extend</span><span class="p">({},</span> <span class="p">{</span></div><div class='line' id='LC328'>				<span class="nx">$roller</span><span class="o">:</span> <span class="nx">$roller</span><span class="p">,</span></div><div class='line' id='LC329'>				<span class="nx">$viewport</span><span class="o">:</span> <span class="nx">$roller</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s2">&quot;.roller-viewport&quot;</span><span class="p">).</span><span class="nx">eq</span><span class="p">(</span><span class="mi">0</span><span class="p">),</span></div><div class='line' id='LC330'>				<span class="nx">$canister</span><span class="o">:</span> <span class="nx">$roller</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s2">&quot;.roller-canister&quot;</span><span class="p">).</span><span class="nx">eq</span><span class="p">(</span><span class="mi">0</span><span class="p">),</span></div><div class='line' id='LC331'>				<span class="nx">$captions</span><span class="o">:</span> <span class="nx">$roller</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s2">&quot;.roller-captions&quot;</span><span class="p">).</span><span class="nx">eq</span><span class="p">(</span><span class="mi">0</span><span class="p">),</span></div><div class='line' id='LC332'>				<span class="nx">$controls</span><span class="o">:</span> <span class="nx">$roller</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s2">&quot;.roller-controls&quot;</span><span class="p">).</span><span class="nx">eq</span><span class="p">(</span><span class="mi">0</span><span class="p">),</span></div><div class='line' id='LC333'>				<span class="nx">$pagination</span><span class="o">:</span> <span class="nx">$roller</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s2">&quot;.roller-pagination&quot;</span><span class="p">).</span><span class="nx">eq</span><span class="p">(</span><span class="mi">0</span><span class="p">),</span></div><div class='line' id='LC334'>				<span class="nx">index</span><span class="o">:</span> <span class="mi">0</span><span class="p">,</span></div><div class='line' id='LC335'>				<span class="nx">deltaX</span><span class="o">:</span> <span class="kc">null</span><span class="p">,</span></div><div class='line' id='LC336'>				<span class="nx">deltaY</span><span class="o">:</span> <span class="kc">null</span><span class="p">,</span></div><div class='line' id='LC337'>				<span class="nx">leftPosition</span><span class="o">:</span> <span class="mi">0</span><span class="p">,</span></div><div class='line' id='LC338'>				<span class="nx">xStart</span><span class="o">:</span> <span class="mi">0</span><span class="p">,</span></div><div class='line' id='LC339'>				<span class="nx">yStart</span><span class="o">:</span> <span class="mi">0</span><span class="p">,</span></div><div class='line' id='LC340'>				<span class="nx">enabled</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC341'>				<span class="nx">touchstart</span><span class="o">:</span> <span class="mi">0</span><span class="p">,</span></div><div class='line' id='LC342'>				<span class="nx">touchEnd</span><span class="o">:</span> <span class="mi">0</span></div><div class='line' id='LC343'>			<span class="p">},</span> <span class="nx">opts</span><span class="p">);</span></div><div class='line' id='LC344'><br/></div><div class='line' id='LC345'>			<span class="nx">data</span><span class="p">.</span><span class="nx">$items</span> <span class="o">=</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">single</span><span class="p">)</span> <span class="o">?</span> <span class="nx">data</span><span class="p">.</span><span class="nx">$roller</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s2">&quot;.roller-item&quot;</span><span class="p">)</span> <span class="o">:</span> <span class="nx">data</span><span class="p">.</span><span class="nx">$canister</span><span class="p">.</span><span class="nx">children</span><span class="p">(</span><span class="s2">&quot;.roller-item&quot;</span><span class="p">);</span></div><div class='line' id='LC346'>			<span class="nx">data</span><span class="p">.</span><span class="nx">$captionItems</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">$captions</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s2">&quot;.roller-caption&quot;</span><span class="p">);</span></div><div class='line' id='LC347'>			<span class="nx">data</span><span class="p">.</span><span class="nx">$controlItems</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">$controls</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s2">&quot;.roller-control&quot;</span><span class="p">);</span></div><div class='line' id='LC348'>			<span class="nx">data</span><span class="p">.</span><span class="nx">$paginationItems</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">$pagination</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s2">&quot;.roller-page&quot;</span><span class="p">);</span></div><div class='line' id='LC349'>			<span class="nx">data</span><span class="p">.</span><span class="nx">$images</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">$canister</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s2">&quot;img&quot;</span><span class="p">);</span></div><div class='line' id='LC350'><br/></div><div class='line' id='LC351'>			<span class="nx">data</span><span class="p">.</span><span class="nx">totalImages</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">$images</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span></div><div class='line' id='LC352'><br/></div><div class='line' id='LC353'>			<span class="nx">$roller</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="s2">&quot;roller&quot;</span><span class="p">,</span> <span class="nx">data</span><span class="p">);</span></div><div class='line' id='LC354'><br/></div><div class='line' id='LC355'>			<span class="c1">//pub.enable.apply(data.$roller);</span></div><div class='line' id='LC356'>			<span class="c1">// Navtive MQ Support</span></div><div class='line' id='LC357'>			<span class="k">if</span> <span class="p">(</span><span class="nb">window</span><span class="p">.</span><span class="nx">matchMedia</span> <span class="o">!==</span> <span class="kc">undefined</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC358'>				<span class="nx">data</span><span class="p">.</span><span class="nx">maxWidth</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">maxWidth</span> <span class="o">===</span> <span class="kc">Infinity</span> <span class="o">?</span> <span class="s2">&quot;100000px&quot;</span> <span class="o">:</span> <span class="nx">data</span><span class="p">.</span><span class="nx">maxWidth</span><span class="p">;</span></div><div class='line' id='LC359'>				<span class="nx">data</span><span class="p">.</span><span class="nx">mediaQuery</span> <span class="o">=</span> <span class="nb">window</span><span class="p">.</span><span class="nx">matchMedia</span><span class="p">(</span><span class="s2">&quot;(min-width:&quot;</span> <span class="o">+</span> <span class="nx">data</span><span class="p">.</span><span class="nx">minWidth</span> <span class="o">+</span> <span class="s2">&quot;) and (max-width:&quot;</span> <span class="o">+</span> <span class="nx">data</span><span class="p">.</span><span class="nx">maxWidth</span> <span class="o">+</span> <span class="s2">&quot;)&quot;</span><span class="p">);</span></div><div class='line' id='LC360'>				<span class="c1">// Make sure we stay in context</span></div><div class='line' id='LC361'>				<span class="nx">data</span><span class="p">.</span><span class="nx">mediaQuery</span><span class="p">.</span><span class="nx">addListener</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC362'>					<span class="nx">_onRespond</span><span class="p">.</span><span class="nx">apply</span><span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">$roller</span><span class="p">);</span></div><div class='line' id='LC363'>				<span class="p">});</span></div><div class='line' id='LC364'>				<span class="nx">_onRespond</span><span class="p">.</span><span class="nx">apply</span><span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">$roller</span><span class="p">);</span></div><div class='line' id='LC365'>			<span class="p">}</span></div><div class='line' id='LC366'><br/></div><div class='line' id='LC367'>			<span class="c1">// Watch images</span></div><div class='line' id='LC368'>			<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">totalImages</span> <span class="o">&gt;</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC369'>				<span class="nx">data</span><span class="p">.</span><span class="nx">loadedImages</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span></div><div class='line' id='LC370'>				<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">data</span><span class="p">.</span><span class="nx">totalImages</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC371'>					<span class="kd">var</span> <span class="nx">$img</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">$images</span><span class="p">.</span><span class="nx">eq</span><span class="p">(</span><span class="nx">i</span><span class="p">);</span></div><div class='line' id='LC372'>					<span class="nx">$img</span><span class="p">.</span><span class="nx">one</span><span class="p">(</span><span class="s2">&quot;load.roller&quot;</span><span class="p">,</span> <span class="nx">data</span><span class="p">,</span> <span class="nx">_onImageLoad</span><span class="p">);</span></div><div class='line' id='LC373'>					<span class="k">if</span> <span class="p">(</span><span class="nx">$img</span><span class="p">[</span><span class="mi">0</span><span class="p">].</span><span class="nx">complete</span> <span class="o">||</span> <span class="nx">$img</span><span class="p">[</span><span class="mi">0</span><span class="p">].</span><span class="nx">height</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC374'>						<span class="nx">$img</span><span class="p">.</span><span class="nx">trigger</span><span class="p">(</span><span class="s2">&quot;load.roller&quot;</span><span class="p">);</span></div><div class='line' id='LC375'>					<span class="p">}</span></div><div class='line' id='LC376'>				<span class="p">}</span></div><div class='line' id='LC377'>			<span class="p">}</span></div><div class='line' id='LC378'><br/></div><div class='line' id='LC379'>			<span class="c1">// Auto timer</span></div><div class='line' id='LC380'>			<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">autoAdvance</span> <span class="o">||</span> <span class="nx">data</span><span class="p">.</span><span class="nx">auto</span><span class="p">)</span> <span class="p">{</span> <span class="c1">// backwards compatibility</span></div><div class='line' id='LC381'>				<span class="nx">data</span><span class="p">.</span><span class="nx">autoTimer</span> <span class="o">=</span> <span class="nx">_startTimer</span><span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">autoTimer</span><span class="p">,</span> <span class="nx">data</span><span class="p">.</span><span class="nx">autoTime</span><span class="p">,</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC382'>					<span class="nx">_autoAdvance</span><span class="p">(</span><span class="nx">data</span><span class="p">);</span></div><div class='line' id='LC383'>				<span class="p">},</span> <span class="kc">true</span><span class="p">);</span></div><div class='line' id='LC384'>			<span class="p">}</span></div><div class='line' id='LC385'>		<span class="p">}</span></div><div class='line' id='LC386'>	<span class="p">}</span></div><div class='line' id='LC387'><br/></div><div class='line' id='LC388'>	<span class="cm">/**</span></div><div class='line' id='LC389'><span class="cm">	 * @method private</span></div><div class='line' id='LC390'><span class="cm">	 * @name _onImageLoad</span></div><div class='line' id='LC391'><span class="cm">	 * @description Handles child image load</span></div><div class='line' id='LC392'><span class="cm">	 * @param e [object] &quot;Event data&quot;</span></div><div class='line' id='LC393'><span class="cm">	 */</span></div><div class='line' id='LC394'>	<span class="kd">function</span> <span class="nx">_onImageLoad</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC395'>		<span class="kd">var</span> <span class="nx">data</span> <span class="o">=</span> <span class="nx">e</span><span class="p">.</span><span class="nx">data</span><span class="p">;</span></div><div class='line' id='LC396'>		<span class="nx">data</span><span class="p">.</span><span class="nx">loadedImages</span><span class="o">++</span><span class="p">;</span></div><div class='line' id='LC397'>		<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">loadedImages</span> <span class="o">===</span> <span class="nx">data</span><span class="p">.</span><span class="nx">totalImages</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC398'>			<span class="nx">pub</span><span class="p">.</span><span class="nx">resize</span><span class="p">.</span><span class="nx">apply</span><span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">$roller</span><span class="p">);</span></div><div class='line' id='LC399'>		<span class="p">}</span></div><div class='line' id='LC400'>	<span class="p">}</span></div><div class='line' id='LC401'><br/></div><div class='line' id='LC402'>	<span class="cm">/**</span></div><div class='line' id='LC403'><span class="cm">	 * @method private</span></div><div class='line' id='LC404'><span class="cm">	 * @name _onTouchStart</span></div><div class='line' id='LC405'><span class="cm">	 * @description Handles touchstart event</span></div><div class='line' id='LC406'><span class="cm">	 * @param e [object] &quot;Event data&quot;</span></div><div class='line' id='LC407'><span class="cm">	 */</span></div><div class='line' id='LC408'>	<span class="kd">function</span> <span class="nx">_onTouchStart</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC409'>		<span class="nx">e</span><span class="p">.</span><span class="nx">stopPropagation</span><span class="p">();</span></div><div class='line' id='LC410'><br/></div><div class='line' id='LC411'>		<span class="kd">var</span> <span class="nx">data</span> <span class="o">=</span> <span class="nx">e</span><span class="p">.</span><span class="nx">data</span><span class="p">;</span></div><div class='line' id='LC412'><br/></div><div class='line' id='LC413'>		<span class="nx">_clearTimer</span><span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">autoTimer</span><span class="p">);</span></div><div class='line' id='LC414'><br/></div><div class='line' id='LC415'>		<span class="nx">data</span><span class="p">.</span><span class="nx">touchStart</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">().</span><span class="nx">getTime</span><span class="p">();</span></div><div class='line' id='LC416'>		<span class="nx">data</span><span class="p">.</span><span class="nx">$canister</span><span class="p">.</span><span class="nx">css</span><span class="p">(</span> <span class="nx">_prefix</span><span class="p">(</span><span class="s2">&quot;transition&quot;</span><span class="p">,</span> <span class="s2">&quot;none&quot;</span><span class="p">)</span> <span class="p">);</span></div><div class='line' id='LC417'><br/></div><div class='line' id='LC418'>		<span class="kd">var</span> <span class="nx">touch</span> <span class="o">=</span> <span class="p">(</span><span class="k">typeof</span> <span class="nx">e</span><span class="p">.</span><span class="nx">originalEvent</span><span class="p">.</span><span class="nx">targetTouches</span> <span class="o">!==</span> <span class="s2">&quot;undefined&quot;</span><span class="p">)</span> <span class="o">?</span> <span class="nx">e</span><span class="p">.</span><span class="nx">originalEvent</span><span class="p">.</span><span class="nx">targetTouches</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">:</span> <span class="kc">null</span><span class="p">;</span></div><div class='line' id='LC419'>		<span class="nx">data</span><span class="p">.</span><span class="nx">xStart</span> <span class="o">=</span> <span class="p">(</span><span class="nx">touch</span><span class="p">)</span> <span class="o">?</span> <span class="nx">touch</span><span class="p">.</span><span class="nx">pageX</span> <span class="o">:</span> <span class="nx">e</span><span class="p">.</span><span class="nx">clientX</span><span class="p">;</span></div><div class='line' id='LC420'>		<span class="nx">data</span><span class="p">.</span><span class="nx">yStart</span> <span class="o">=</span> <span class="p">(</span><span class="nx">touch</span><span class="p">)</span> <span class="o">?</span> <span class="nx">touch</span><span class="p">.</span><span class="nx">pageY</span> <span class="o">:</span> <span class="nx">e</span><span class="p">.</span><span class="nx">clientY</span><span class="p">;</span></div><div class='line' id='LC421'><br/></div><div class='line' id='LC422'>		<span class="nx">data</span><span class="p">.</span><span class="nx">$canister</span><span class="p">.</span><span class="nx">on</span><span class="p">(</span><span class="s2">&quot;touchmove.roller&quot;</span><span class="p">,</span> <span class="nx">data</span><span class="p">,</span> <span class="nx">_onTouchMove</span><span class="p">)</span></div><div class='line' id='LC423'>					  <span class="p">.</span><span class="nx">one</span><span class="p">(</span><span class="s2">&quot;touchend.roller touchcancel.roller&quot;</span><span class="p">,</span> <span class="nx">data</span><span class="p">,</span> <span class="nx">_onTouchEnd</span><span class="p">);</span></div><div class='line' id='LC424'>	<span class="p">}</span></div><div class='line' id='LC425'><br/></div><div class='line' id='LC426'>	<span class="cm">/**</span></div><div class='line' id='LC427'><span class="cm">	 * @method private</span></div><div class='line' id='LC428'><span class="cm">	 * @name _onTouchMove</span></div><div class='line' id='LC429'><span class="cm">	 * @description Handles touchmove event</span></div><div class='line' id='LC430'><span class="cm">	 * @param e [object] &quot;Event data&quot;</span></div><div class='line' id='LC431'><span class="cm">	 */</span></div><div class='line' id='LC432'>	<span class="kd">function</span> <span class="nx">_onTouchMove</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC433'>		<span class="nx">e</span><span class="p">.</span><span class="nx">stopPropagation</span><span class="p">();</span></div><div class='line' id='LC434'><br/></div><div class='line' id='LC435'>		<span class="kd">var</span> <span class="nx">data</span> <span class="o">=</span> <span class="nx">e</span><span class="p">.</span><span class="nx">data</span><span class="p">,</span></div><div class='line' id='LC436'>			<span class="nx">touch</span> <span class="o">=</span> <span class="p">(</span><span class="k">typeof</span> <span class="nx">e</span><span class="p">.</span><span class="nx">originalEvent</span><span class="p">.</span><span class="nx">targetTouches</span> <span class="o">!==</span> <span class="s2">&quot;undefined&quot;</span><span class="p">)</span> <span class="o">?</span> <span class="nx">e</span><span class="p">.</span><span class="nx">originalEvent</span><span class="p">.</span><span class="nx">targetTouches</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">:</span> <span class="kc">null</span><span class="p">;</span></div><div class='line' id='LC437'><br/></div><div class='line' id='LC438'>		<span class="nx">data</span><span class="p">.</span><span class="nx">deltaX</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">xStart</span> <span class="o">-</span> <span class="p">((</span><span class="nx">touch</span><span class="p">)</span> <span class="o">?</span> <span class="nx">touch</span><span class="p">.</span><span class="nx">pageX</span> <span class="o">:</span> <span class="nx">e</span><span class="p">.</span><span class="nx">clientX</span><span class="p">);</span></div><div class='line' id='LC439'>		<span class="nx">data</span><span class="p">.</span><span class="nx">deltaY</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">yStart</span> <span class="o">-</span> <span class="p">((</span><span class="nx">touch</span><span class="p">)</span> <span class="o">?</span> <span class="nx">touch</span><span class="p">.</span><span class="nx">pageY</span> <span class="o">:</span> <span class="nx">e</span><span class="p">.</span><span class="nx">clientY</span><span class="p">);</span></div><div class='line' id='LC440'><br/></div><div class='line' id='LC441'>		<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">deltaX</span> <span class="o">&lt;</span> <span class="o">-</span><span class="mi">10</span> <span class="o">||</span> <span class="nx">data</span><span class="p">.</span><span class="nx">deltaX</span> <span class="o">&gt;</span> <span class="mi">10</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC442'>			<span class="nx">e</span><span class="p">.</span><span class="nx">preventDefault</span><span class="p">();</span></div><div class='line' id='LC443'>		<span class="p">}</span></div><div class='line' id='LC444'><br/></div><div class='line' id='LC445'>		<span class="nx">data</span><span class="p">.</span><span class="nx">touchLeft</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">leftPosition</span> <span class="o">-</span> <span class="nx">data</span><span class="p">.</span><span class="nx">deltaX</span><span class="p">;</span></div><div class='line' id='LC446'>		<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">touchLeft</span> <span class="o">&gt;</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC447'>			<span class="nx">data</span><span class="p">.</span><span class="nx">touchLeft</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span></div><div class='line' id='LC448'>		<span class="p">}</span></div><div class='line' id='LC449'>		<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">touchLeft</span> <span class="o">&lt;</span> <span class="nx">data</span><span class="p">.</span><span class="nx">maxMove</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC450'>			<span class="nx">data</span><span class="p">.</span><span class="nx">touchLeft</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">maxMove</span><span class="p">;</span></div><div class='line' id='LC451'>		<span class="p">}</span></div><div class='line' id='LC452'><br/></div><div class='line' id='LC453'>		<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">useMargin</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC454'>			<span class="nx">data</span><span class="p">.</span><span class="nx">$canister</span><span class="p">.</span><span class="nx">css</span><span class="p">({</span> <span class="nx">marginLeft</span><span class="o">:</span> <span class="nx">data</span><span class="p">.</span><span class="nx">touchLeft</span> <span class="p">});</span></div><div class='line' id='LC455'>		<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC456'>			<span class="nx">data</span><span class="p">.</span><span class="nx">$canister</span><span class="p">.</span><span class="nx">css</span><span class="p">(</span> <span class="nx">_prefix</span><span class="p">(</span><span class="s2">&quot;transform&quot;</span><span class="p">,</span> <span class="s2">&quot;translate3d(&quot;</span><span class="o">+</span><span class="nx">data</span><span class="p">.</span><span class="nx">touchLeft</span><span class="o">+</span><span class="s2">&quot;px, 0, 0)&quot;</span><span class="p">)</span> <span class="p">);</span></div><div class='line' id='LC457'>		<span class="p">}</span></div><div class='line' id='LC458'>	<span class="p">}</span></div><div class='line' id='LC459'><br/></div><div class='line' id='LC460'>	<span class="cm">/**</span></div><div class='line' id='LC461'><span class="cm">	 * @method private</span></div><div class='line' id='LC462'><span class="cm">	 * @name _onTouchEnd</span></div><div class='line' id='LC463'><span class="cm">	 * @description Handles touchend event</span></div><div class='line' id='LC464'><span class="cm">	 * @param e [object] &quot;Event data&quot;</span></div><div class='line' id='LC465'><span class="cm">	 */</span></div><div class='line' id='LC466'>	<span class="kd">function</span> <span class="nx">_onTouchEnd</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC467'>		<span class="kd">var</span> <span class="nx">data</span> <span class="o">=</span> <span class="nx">e</span><span class="p">.</span><span class="nx">data</span><span class="p">;</span></div><div class='line' id='LC468'><br/></div><div class='line' id='LC469'>		<span class="nx">data</span><span class="p">.</span><span class="nx">touchEnd</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">().</span><span class="nx">getTime</span><span class="p">();</span></div><div class='line' id='LC470'>		<span class="nx">data</span><span class="p">.</span><span class="nx">leftPosition</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">touchLeft</span><span class="p">;</span></div><div class='line' id='LC471'>		<span class="nx">data</span><span class="p">.</span><span class="nx">$canister</span><span class="p">.</span><span class="nx">css</span><span class="p">(</span> <span class="nx">_prefix</span><span class="p">(</span><span class="s2">&quot;transition&quot;</span><span class="p">,</span> <span class="s2">&quot;&quot;</span><span class="p">)</span> <span class="p">);</span></div><div class='line' id='LC472'><br/></div><div class='line' id='LC473'>		<span class="nx">data</span><span class="p">.</span><span class="nx">$canister</span><span class="p">.</span><span class="nx">off</span><span class="p">(</span><span class="s2">&quot;touchmove.roller touchend.roller touchcancel.roller&quot;</span><span class="p">);</span></div><div class='line' id='LC474'><br/></div><div class='line' id='LC475'>		<span class="c1">// only update index if we actually moved</span></div><div class='line' id='LC476'>		<span class="kd">var</span> <span class="nx">index</span> <span class="o">=</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">deltaX</span> <span class="o">&gt;</span> <span class="o">-</span><span class="mi">10</span> <span class="o">&amp;&amp;</span> <span class="nx">data</span><span class="p">.</span><span class="nx">deltaX</span> <span class="o">&lt;</span> <span class="mi">10</span><span class="p">)</span> <span class="o">?</span> <span class="nx">data</span><span class="p">.</span><span class="nx">index</span> <span class="o">:</span> <span class="nx">_calculateIndex</span><span class="p">(</span><span class="nx">data</span><span class="p">);</span></div><div class='line' id='LC477'><br/></div><div class='line' id='LC478'>		<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">touchPaged</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="nx">data</span><span class="p">.</span><span class="nx">swipe</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC479'>			<span class="nx">_position</span><span class="p">(</span><span class="nx">data</span><span class="p">,</span> <span class="nx">index</span><span class="p">);</span></div><div class='line' id='LC480'>		<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC481'>			<span class="nx">data</span><span class="p">.</span><span class="nx">index</span> <span class="o">=</span> <span class="nx">index</span><span class="p">;</span></div><div class='line' id='LC482'>			<span class="nx">_updateControls</span><span class="p">(</span><span class="nx">data</span><span class="p">);</span></div><div class='line' id='LC483'>		<span class="p">}</span></div><div class='line' id='LC484'>		<span class="nx">data</span><span class="p">.</span><span class="nx">deltaX</span> <span class="o">=</span> <span class="kc">null</span><span class="p">;</span></div><div class='line' id='LC485'>		<span class="nx">data</span><span class="p">.</span><span class="nx">touchStart</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span></div><div class='line' id='LC486'>		<span class="nx">data</span><span class="p">.</span><span class="nx">touchEnd</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span></div><div class='line' id='LC487'>	<span class="p">}</span></div><div class='line' id='LC488'><br/></div><div class='line' id='LC489'>	<span class="cm">/**</span></div><div class='line' id='LC490'><span class="cm">	 * @method private</span></div><div class='line' id='LC491'><span class="cm">	 * @name _autoAdvance</span></div><div class='line' id='LC492'><span class="cm">	 * @description Handles auto advancement</span></div><div class='line' id='LC493'><span class="cm">	 * @param data [object] &quot;Instance data&quot;</span></div><div class='line' id='LC494'><span class="cm">	 */</span></div><div class='line' id='LC495'>	<span class="kd">function</span> <span class="nx">_autoAdvance</span><span class="p">(</span><span class="nx">data</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC496'>		<span class="kd">var</span> <span class="nx">index</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">index</span> <span class="o">+</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC497'>		<span class="k">if</span> <span class="p">(</span><span class="nx">index</span> <span class="o">&gt;</span> <span class="nx">data</span><span class="p">.</span><span class="nx">pageCount</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC498'>			<span class="nx">index</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span></div><div class='line' id='LC499'>		<span class="p">}</span></div><div class='line' id='LC500'>		<span class="nx">_position</span><span class="p">(</span><span class="nx">data</span><span class="p">,</span> <span class="nx">index</span><span class="p">);</span></div><div class='line' id='LC501'>	<span class="p">}</span></div><div class='line' id='LC502'><br/></div><div class='line' id='LC503'>	<span class="cm">/**</span></div><div class='line' id='LC504'><span class="cm">	 * @method private</span></div><div class='line' id='LC505'><span class="cm">	 * @name _onAdvance</span></div><div class='line' id='LC506'><span class="cm">	 * @description Handles item advancement</span></div><div class='line' id='LC507'><span class="cm">	 * @param e [object] &quot;Event data&quot;</span></div><div class='line' id='LC508'><span class="cm">	 */</span></div><div class='line' id='LC509'>	<span class="kd">function</span> <span class="nx">_onAdvance</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC510'>		<span class="nx">e</span><span class="p">.</span><span class="nx">preventDefault</span><span class="p">();</span></div><div class='line' id='LC511'>		<span class="nx">e</span><span class="p">.</span><span class="nx">stopPropagation</span><span class="p">();</span></div><div class='line' id='LC512'><br/></div><div class='line' id='LC513'>		<span class="kd">var</span> <span class="nx">data</span> <span class="o">=</span> <span class="nx">e</span><span class="p">.</span><span class="nx">data</span><span class="p">,</span></div><div class='line' id='LC514'>			<span class="nx">index</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">index</span> <span class="o">+</span> <span class="p">((</span><span class="nx">$</span><span class="p">(</span><span class="nx">e</span><span class="p">.</span><span class="nx">currentTarget</span><span class="p">).</span><span class="nx">hasClass</span><span class="p">(</span><span class="s2">&quot;next&quot;</span><span class="p">))</span> <span class="o">?</span> <span class="mi">1</span> <span class="o">:</span> <span class="o">-</span><span class="mi">1</span><span class="p">);</span></div><div class='line' id='LC515'><br/></div><div class='line' id='LC516'>		<span class="nx">_clearTimer</span><span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">autoTimer</span><span class="p">);</span></div><div class='line' id='LC517'>		<span class="nx">_position</span><span class="p">(</span><span class="nx">data</span><span class="p">,</span> <span class="nx">index</span><span class="p">);</span></div><div class='line' id='LC518'>	<span class="p">}</span></div><div class='line' id='LC519'><br/></div><div class='line' id='LC520'>	<span class="cm">/**</span></div><div class='line' id='LC521'><span class="cm">	 * @method private</span></div><div class='line' id='LC522'><span class="cm">	 * @name _onSelect</span></div><div class='line' id='LC523'><span class="cm">	 * @description Handles item select</span></div><div class='line' id='LC524'><span class="cm">	 * @param e [object] &quot;Event data&quot;</span></div><div class='line' id='LC525'><span class="cm">	 */</span></div><div class='line' id='LC526'>	<span class="kd">function</span> <span class="nx">_onSelect</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC527'>		<span class="nx">e</span><span class="p">.</span><span class="nx">preventDefault</span><span class="p">();</span></div><div class='line' id='LC528'>		<span class="nx">e</span><span class="p">.</span><span class="nx">stopPropagation</span><span class="p">();</span></div><div class='line' id='LC529'><br/></div><div class='line' id='LC530'>		<span class="kd">var</span> <span class="nx">data</span> <span class="o">=</span> <span class="nx">e</span><span class="p">.</span><span class="nx">data</span><span class="p">,</span></div><div class='line' id='LC531'>			<span class="nx">index</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">$paginationItems</span><span class="p">.</span><span class="nx">index</span><span class="p">(</span><span class="nx">$</span><span class="p">(</span><span class="nx">e</span><span class="p">.</span><span class="nx">currentTarget</span><span class="p">));</span></div><div class='line' id='LC532'><br/></div><div class='line' id='LC533'>		<span class="nx">_clearTimer</span><span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">autoTimer</span><span class="p">);</span></div><div class='line' id='LC534'>		<span class="nx">_position</span><span class="p">(</span><span class="nx">data</span><span class="p">,</span> <span class="nx">index</span><span class="p">);</span></div><div class='line' id='LC535'>	<span class="p">}</span></div><div class='line' id='LC536'><br/></div><div class='line' id='LC537'>	<span class="cm">/**</span></div><div class='line' id='LC538'><span class="cm">	 * @method private</span></div><div class='line' id='LC539'><span class="cm">	 * @name _position</span></div><div class='line' id='LC540'><span class="cm">	 * @description Handles updating instance position</span></div><div class='line' id='LC541'><span class="cm">	 * @param data [object] &quot;Instance data&quot;</span></div><div class='line' id='LC542'><span class="cm">	 * @param index [int] &quot;Item index&quot;</span></div><div class='line' id='LC543'><span class="cm">	 */</span></div><div class='line' id='LC544'>	<span class="kd">function</span> <span class="nx">_position</span><span class="p">(</span><span class="nx">data</span><span class="p">,</span> <span class="nx">index</span><span class="p">,</span> <span class="nx">animate</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC545'>		<span class="k">if</span> <span class="p">(</span><span class="nx">index</span> <span class="o">&lt;</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC546'>			<span class="nx">index</span> <span class="o">=</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">infinite</span><span class="p">)</span> <span class="o">?</span> <span class="nx">data</span><span class="p">.</span><span class="nx">pageCount</span> <span class="o">:</span> <span class="mi">0</span><span class="p">;</span></div><div class='line' id='LC547'>		<span class="p">}</span></div><div class='line' id='LC548'>		<span class="k">if</span> <span class="p">(</span><span class="nx">index</span> <span class="o">&gt;</span> <span class="nx">data</span><span class="p">.</span><span class="nx">pageCount</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC549'>			<span class="nx">index</span> <span class="o">=</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">infinite</span><span class="p">)</span> <span class="o">?</span> <span class="mi">0</span> <span class="o">:</span> <span class="nx">data</span><span class="p">.</span><span class="nx">pageCount</span><span class="p">;</span></div><div class='line' id='LC550'>		<span class="p">}</span></div><div class='line' id='LC551'><br/></div><div class='line' id='LC552'>		<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">single</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC553'>			<span class="nx">data</span><span class="p">.</span><span class="nx">$items</span><span class="p">.</span><span class="nx">removeClass</span><span class="p">(</span><span class="s2">&quot;active&quot;</span><span class="p">)</span></div><div class='line' id='LC554'>					   <span class="p">.</span><span class="nx">eq</span><span class="p">(</span><span class="nx">index</span><span class="p">)</span></div><div class='line' id='LC555'>					   <span class="p">.</span><span class="nx">addClass</span><span class="p">(</span><span class="s2">&quot;active&quot;</span><span class="p">);</span></div><div class='line' id='LC556'>		<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC557'>			<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">paged</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC558'>				<span class="kd">var</span> <span class="nx">offset</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">$items</span><span class="p">.</span><span class="nx">eq</span><span class="p">(</span><span class="nx">index</span><span class="p">).</span><span class="nx">position</span><span class="p">();</span></div><div class='line' id='LC559'>				<span class="k">if</span> <span class="p">(</span><span class="nx">offset</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC560'>					<span class="nx">data</span><span class="p">.</span><span class="nx">leftPosition</span> <span class="o">=</span> <span class="o">-</span><span class="nx">offset</span><span class="p">.</span><span class="nx">left</span><span class="p">;</span></div><div class='line' id='LC561'>				<span class="p">}</span></div><div class='line' id='LC562'>			<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC563'>				<span class="nx">data</span><span class="p">.</span><span class="nx">leftPosition</span> <span class="o">=</span> <span class="o">-</span><span class="p">(</span><span class="nx">index</span> <span class="o">*</span> <span class="nx">data</span><span class="p">.</span><span class="nx">pageMove</span><span class="p">);</span></div><div class='line' id='LC564'>			<span class="p">}</span></div><div class='line' id='LC565'><br/></div><div class='line' id='LC566'>			<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">leftPosition</span> <span class="o">&lt;</span> <span class="nx">data</span><span class="p">.</span><span class="nx">maxMove</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC567'>				<span class="nx">data</span><span class="p">.</span><span class="nx">leftPosition</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">maxMove</span><span class="p">;</span></div><div class='line' id='LC568'>			<span class="p">}</span></div><div class='line' id='LC569'><br/></div><div class='line' id='LC570'>			<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">useMargin</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC571'>				<span class="nx">data</span><span class="p">.</span><span class="nx">$canister</span><span class="p">.</span><span class="nx">css</span><span class="p">({</span> <span class="nx">marginLeft</span><span class="o">:</span> <span class="nx">data</span><span class="p">.</span><span class="nx">leftPosition</span> <span class="p">});</span></div><div class='line' id='LC572'>			<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC573'>				<span class="k">if</span> <span class="p">(</span><span class="nx">animate</span> <span class="o">===</span> <span class="kc">false</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC574'>					<span class="nx">data</span><span class="p">.</span><span class="nx">$canister</span><span class="p">.</span><span class="nx">css</span><span class="p">(</span> <span class="nx">_prefix</span><span class="p">(</span><span class="s2">&quot;transition&quot;</span><span class="p">,</span> <span class="s2">&quot;none&quot;</span><span class="p">)</span> <span class="p">)</span></div><div class='line' id='LC575'>								  <span class="p">.</span><span class="nx">css</span><span class="p">(</span> <span class="nx">_prefix</span><span class="p">(</span><span class="s2">&quot;transform&quot;</span><span class="p">,</span> <span class="s2">&quot;translate3d(&quot;</span><span class="o">+</span><span class="nx">data</span><span class="p">.</span><span class="nx">leftPosition</span><span class="o">+</span><span class="s2">&quot;px, 0, 0)&quot;</span><span class="p">)</span> <span class="p">);</span></div><div class='line' id='LC576'><br/></div><div class='line' id='LC577'>					<span class="c1">// Slight delay before adding transitions backs</span></div><div class='line' id='LC578'>					<span class="nx">data</span><span class="p">.</span><span class="nx">resizeTimer</span> <span class="o">=</span> <span class="nx">_startTimer</span><span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">resizeTimer</span><span class="p">,</span> <span class="mi">5</span><span class="p">,</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC579'>						<span class="nx">data</span><span class="p">.</span><span class="nx">$canister</span><span class="p">.</span><span class="nx">css</span><span class="p">(</span> <span class="nx">_prefix</span><span class="p">(</span><span class="s2">&quot;transition&quot;</span><span class="p">,</span> <span class="s2">&quot;&quot;</span><span class="p">)</span> <span class="p">);</span></div><div class='line' id='LC580'>					<span class="p">},</span> <span class="kc">false</span><span class="p">);</span></div><div class='line' id='LC581'>				<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC582'>					<span class="nx">data</span><span class="p">.</span><span class="nx">$canister</span><span class="p">.</span><span class="nx">css</span><span class="p">(</span> <span class="nx">_prefix</span><span class="p">(</span><span class="s2">&quot;transform&quot;</span><span class="p">,</span> <span class="s2">&quot;translate3d(&quot;</span><span class="o">+</span><span class="nx">data</span><span class="p">.</span><span class="nx">leftPosition</span><span class="o">+</span><span class="s2">&quot;px, 0, 0)&quot;</span><span class="p">)</span> <span class="p">);</span></div><div class='line' id='LC583'>				<span class="p">}</span></div><div class='line' id='LC584'>			<span class="p">}</span></div><div class='line' id='LC585'>		<span class="p">}</span></div><div class='line' id='LC586'><br/></div><div class='line' id='LC587'>		<span class="k">if</span> <span class="p">(</span><span class="nx">index</span> <span class="o">!==</span> <span class="nx">data</span><span class="p">.</span><span class="nx">index</span> <span class="o">&amp;&amp;</span> <span class="nx">animate</span> <span class="o">!==</span> <span class="kc">false</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC588'>			<span class="nx">data</span><span class="p">.</span><span class="nx">$roller</span><span class="p">.</span><span class="nx">trigger</span><span class="p">(</span><span class="s2">&quot;update.roller&quot;</span><span class="p">,</span> <span class="p">[</span> <span class="nx">index</span> <span class="p">]);</span></div><div class='line' id='LC589'>		<span class="p">}</span></div><div class='line' id='LC590'>		<span class="nx">data</span><span class="p">.</span><span class="nx">index</span> <span class="o">=</span> <span class="nx">index</span><span class="p">;</span></div><div class='line' id='LC591'><br/></div><div class='line' id='LC592'>		<span class="nx">_updateControls</span><span class="p">(</span><span class="nx">data</span><span class="p">);</span></div><div class='line' id='LC593'>	<span class="p">}</span></div><div class='line' id='LC594'><br/></div><div class='line' id='LC595'>	<span class="cm">/**</span></div><div class='line' id='LC596'><span class="cm">	 * @method private</span></div><div class='line' id='LC597'><span class="cm">	 * @name _updateControls</span></div><div class='line' id='LC598'><span class="cm">	 * @description Handles updating instance controls</span></div><div class='line' id='LC599'><span class="cm">	 * @param data [object] &quot;Instance data&quot;</span></div><div class='line' id='LC600'><span class="cm">	 */</span></div><div class='line' id='LC601'>	<span class="kd">function</span> <span class="nx">_updateControls</span><span class="p">(</span><span class="nx">data</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC602'>		<span class="nx">data</span><span class="p">.</span><span class="nx">$captionItems</span><span class="p">.</span><span class="nx">filter</span><span class="p">(</span><span class="s2">&quot;.active&quot;</span><span class="p">).</span><span class="nx">removeClass</span><span class="p">(</span><span class="s2">&quot;active&quot;</span><span class="p">);</span></div><div class='line' id='LC603'>		<span class="nx">data</span><span class="p">.</span><span class="nx">$captionItems</span><span class="p">.</span><span class="nx">eq</span><span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">index</span><span class="p">).</span><span class="nx">addClass</span><span class="p">(</span><span class="s2">&quot;active&quot;</span><span class="p">);</span></div><div class='line' id='LC604'><br/></div><div class='line' id='LC605'>		<span class="nx">data</span><span class="p">.</span><span class="nx">$paginationItems</span><span class="p">.</span><span class="nx">filter</span><span class="p">(</span><span class="s2">&quot;.active&quot;</span><span class="p">).</span><span class="nx">removeClass</span><span class="p">(</span><span class="s2">&quot;active&quot;</span><span class="p">);</span></div><div class='line' id='LC606'>		<span class="nx">data</span><span class="p">.</span><span class="nx">$paginationItems</span><span class="p">.</span><span class="nx">eq</span><span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">index</span><span class="p">).</span><span class="nx">addClass</span><span class="p">(</span><span class="s2">&quot;active&quot;</span><span class="p">);</span></div><div class='line' id='LC607'><br/></div><div class='line' id='LC608'>		<span class="nx">data</span><span class="p">.</span><span class="nx">$items</span><span class="p">.</span><span class="nx">removeClass</span><span class="p">(</span><span class="s2">&quot;visible&quot;</span><span class="p">);</span></div><div class='line' id='LC609'>		<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">data</span><span class="p">.</span><span class="nx">single</span> <span class="o">&amp;&amp;</span> <span class="nx">data</span><span class="p">.</span><span class="nx">perPage</span> <span class="o">!==</span> <span class="s2">&quot;Infinity&quot;</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC610'>			<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">data</span><span class="p">.</span><span class="nx">perPage</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC611'>				<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">leftPosition</span> <span class="o">===</span> <span class="nx">data</span><span class="p">.</span><span class="nx">maxMove</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC612'>					<span class="nx">data</span><span class="p">.</span><span class="nx">$items</span><span class="p">.</span><span class="nx">eq</span><span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">count</span> <span class="o">-</span> <span class="mi">1</span> <span class="o">-</span> <span class="nx">i</span><span class="p">).</span><span class="nx">addClass</span><span class="p">(</span><span class="s2">&quot;visible&quot;</span><span class="p">);</span></div><div class='line' id='LC613'>				<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC614'>					<span class="nx">data</span><span class="p">.</span><span class="nx">$items</span><span class="p">.</span><span class="nx">eq</span><span class="p">((</span><span class="nx">data</span><span class="p">.</span><span class="nx">perPage</span> <span class="o">*</span> <span class="nx">data</span><span class="p">.</span><span class="nx">index</span><span class="p">)</span> <span class="o">+</span> <span class="nx">i</span><span class="p">).</span><span class="nx">addClass</span><span class="p">(</span><span class="s2">&quot;visible&quot;</span><span class="p">);</span></div><div class='line' id='LC615'>				<span class="p">}</span></div><div class='line' id='LC616'>			<span class="p">}</span></div><div class='line' id='LC617'>		<span class="p">}</span></div><div class='line' id='LC618'><br/></div><div class='line' id='LC619'>		<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">infinite</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC620'>			<span class="nx">data</span><span class="p">.</span><span class="nx">$controlItems</span><span class="p">.</span><span class="nx">addClass</span><span class="p">(</span><span class="s2">&quot;enabled&quot;</span><span class="p">);</span></div><div class='line' id='LC621'>		<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">pageCount</span> <span class="o">&lt;=</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC622'>			<span class="nx">data</span><span class="p">.</span><span class="nx">$controlItems</span><span class="p">.</span><span class="nx">removeClass</span><span class="p">(</span><span class="s2">&quot;enabled&quot;</span><span class="p">);</span></div><div class='line' id='LC623'>		<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC624'>			<span class="nx">data</span><span class="p">.</span><span class="nx">$controlItems</span><span class="p">.</span><span class="nx">addClass</span><span class="p">(</span><span class="s2">&quot;enabled&quot;</span><span class="p">);</span></div><div class='line' id='LC625'>			<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">index</span> <span class="o">&lt;=</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC626'>				<span class="nx">data</span><span class="p">.</span><span class="nx">$controlItems</span><span class="p">.</span><span class="nx">filter</span><span class="p">(</span><span class="s2">&quot;.previous&quot;</span><span class="p">).</span><span class="nx">removeClass</span><span class="p">(</span><span class="s2">&quot;enabled&quot;</span><span class="p">);</span></div><div class='line' id='LC627'>			<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">index</span> <span class="o">&gt;=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">pageCount</span> <span class="o">||</span> <span class="nx">data</span><span class="p">.</span><span class="nx">leftPosition</span> <span class="o">===</span> <span class="nx">data</span><span class="p">.</span><span class="nx">maxMove</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC628'>				<span class="nx">data</span><span class="p">.</span><span class="nx">$controlItems</span><span class="p">.</span><span class="nx">filter</span><span class="p">(</span><span class="s2">&quot;.next&quot;</span><span class="p">).</span><span class="nx">removeClass</span><span class="p">(</span><span class="s2">&quot;enabled&quot;</span><span class="p">);</span></div><div class='line' id='LC629'>			<span class="p">}</span></div><div class='line' id='LC630'>		<span class="p">}</span></div><div class='line' id='LC631'>	<span class="p">}</span></div><div class='line' id='LC632'><br/></div><div class='line' id='LC633'>	<span class="cm">/**</span></div><div class='line' id='LC634'><span class="cm">	 * @method private</span></div><div class='line' id='LC635'><span class="cm">	 * @name _onRespond</span></div><div class='line' id='LC636'><span class="cm">	 * @description Handles media query match change</span></div><div class='line' id='LC637'><span class="cm">	 */</span></div><div class='line' id='LC638'>	<span class="kd">function</span> <span class="nx">_onRespond</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC639'>		<span class="kd">var</span> <span class="nx">data</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="k">this</span><span class="p">).</span><span class="nx">data</span><span class="p">(</span><span class="s2">&quot;roller&quot;</span><span class="p">);</span></div><div class='line' id='LC640'><br/></div><div class='line' id='LC641'>		<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">mediaQuery</span><span class="p">.</span><span class="nx">matches</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC642'>			<span class="nx">pub</span><span class="p">.</span><span class="nx">enable</span><span class="p">.</span><span class="nx">apply</span><span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">$roller</span><span class="p">);</span></div><div class='line' id='LC643'>		<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC644'>			<span class="nx">pub</span><span class="p">.</span><span class="nx">disable</span><span class="p">.</span><span class="nx">apply</span><span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">$roller</span><span class="p">);</span></div><div class='line' id='LC645'>		<span class="p">}</span></div><div class='line' id='LC646'>	<span class="p">}</span></div><div class='line' id='LC647'><br/></div><div class='line' id='LC648'>	<span class="cm">/**</span></div><div class='line' id='LC649'><span class="cm">	 * @method private</span></div><div class='line' id='LC650'><span class="cm">	 * @name _calculateIndex</span></div><div class='line' id='LC651'><span class="cm">	 * @description Determines new index based on current position</span></div><div class='line' id='LC652'><span class="cm">	 * @param data [object] &quot;Instance data&quot;</span></div><div class='line' id='LC653'><span class="cm">	 * @return [int] &quot;New item index&quot;</span></div><div class='line' id='LC654'><span class="cm">	 */</span></div><div class='line' id='LC655'>	<span class="kd">function</span> <span class="nx">_calculateIndex</span><span class="p">(</span><span class="nx">data</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC656'>		<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">single</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC657'>			<span class="k">return</span> <span class="nx">data</span><span class="p">.</span><span class="nx">index</span><span class="p">;</span></div><div class='line' id='LC658'>		<span class="p">}</span> <span class="k">if</span> <span class="p">((</span><span class="nx">data</span><span class="p">.</span><span class="nx">deltaX</span> <span class="o">&gt;</span> <span class="mi">20</span> <span class="o">||</span> <span class="nx">data</span><span class="p">.</span><span class="nx">deltaX</span> <span class="o">&lt;</span> <span class="o">-</span><span class="mi">20</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">touchStart</span> <span class="o">&amp;&amp;</span> <span class="nx">data</span><span class="p">.</span><span class="nx">touchEnd</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="nx">data</span><span class="p">.</span><span class="nx">touchEnd</span> <span class="o">-</span> <span class="nx">data</span><span class="p">.</span><span class="nx">touchStart</span> <span class="o">&lt;</span> <span class="mi">200</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC659'>			<span class="c1">// Swipe</span></div><div class='line' id='LC660'>			<span class="k">return</span> <span class="nx">data</span><span class="p">.</span><span class="nx">index</span> <span class="o">+</span> <span class="p">((</span><span class="nx">data</span><span class="p">.</span><span class="nx">deltaX</span> <span class="o">&gt;</span> <span class="mi">0</span><span class="p">)</span> <span class="o">?</span> <span class="mi">1</span> <span class="o">:</span> <span class="o">-</span><span class="mi">1</span><span class="p">);</span></div><div class='line' id='LC661'>		<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">paged</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC662'>			<span class="c1">// Find page</span></div><div class='line' id='LC663'>			<span class="kd">var</span> <span class="nx">goal</span> <span class="o">=</span> <span class="kc">Infinity</span><span class="p">;</span></div><div class='line' id='LC664'>			<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">leftPosition</span> <span class="o">===</span> <span class="nx">data</span><span class="p">.</span><span class="nx">maxMove</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC665'>				<span class="k">return</span> <span class="nx">data</span><span class="p">.</span><span class="nx">$items</span><span class="p">.</span><span class="nx">length</span> <span class="o">-</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC666'>			<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC667'>				<span class="kd">var</span> <span class="nx">index</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span></div><div class='line' id='LC668'>				<span class="nx">data</span><span class="p">.</span><span class="nx">$items</span><span class="p">.</span><span class="nx">each</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">i</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC669'>					<span class="kd">var</span> <span class="nx">offset</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="k">this</span><span class="p">).</span><span class="nx">position</span><span class="p">(),</span></div><div class='line' id='LC670'>						<span class="nx">check</span> <span class="o">=</span> <span class="nx">offset</span><span class="p">.</span><span class="nx">left</span> <span class="o">+</span> <span class="nx">data</span><span class="p">.</span><span class="nx">leftPosition</span><span class="p">;</span></div><div class='line' id='LC671'><br/></div><div class='line' id='LC672'>					<span class="k">if</span> <span class="p">(</span><span class="nx">check</span> <span class="o">&lt;</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC673'>						<span class="nx">check</span> <span class="o">=</span> <span class="o">-</span><span class="nx">check</span><span class="p">;</span></div><div class='line' id='LC674'>					<span class="p">}</span></div><div class='line' id='LC675'><br/></div><div class='line' id='LC676'>					<span class="k">if</span> <span class="p">(</span><span class="nx">check</span> <span class="o">&lt;</span> <span class="nx">goal</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC677'>						<span class="nx">goal</span> <span class="o">=</span> <span class="nx">check</span><span class="p">;</span></div><div class='line' id='LC678'>						<span class="nx">index</span> <span class="o">=</span> <span class="nx">i</span><span class="p">;</span></div><div class='line' id='LC679'>					<span class="p">}</span></div><div class='line' id='LC680'>				<span class="p">});</span></div><div class='line' id='LC681'>				<span class="k">return</span> <span class="nx">index</span><span class="p">;</span></div><div class='line' id='LC682'>			<span class="p">}</span></div><div class='line' id='LC683'>		<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC684'>			<span class="c1">// Free scrolling</span></div><div class='line' id='LC685'>			<span class="k">return</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">round</span><span class="p">(</span> <span class="o">-</span><span class="nx">data</span><span class="p">.</span><span class="nx">leftPosition</span> <span class="o">/</span> <span class="nx">data</span><span class="p">.</span><span class="nx">viewportWidth</span><span class="p">);</span></div><div class='line' id='LC686'>		<span class="p">}</span></div><div class='line' id='LC687'>	<span class="p">}</span></div><div class='line' id='LC688'><br/></div><div class='line' id='LC689'>	<span class="cm">/**</span></div><div class='line' id='LC690'><span class="cm">	 * @method private</span></div><div class='line' id='LC691'><span class="cm">	 * @name _prefix</span></div><div class='line' id='LC692'><span class="cm">	 * @description Builds vendor-prefixed styles</span></div><div class='line' id='LC693'><span class="cm">	 * @param property [string] &quot;Property to prefix&quot;</span></div><div class='line' id='LC694'><span class="cm">	 * @param value [string] &quot;Property value&quot;</span></div><div class='line' id='LC695'><span class="cm">	 * @return [string] &quot;Vendor-prefixed styles&quot;</span></div><div class='line' id='LC696'><span class="cm">	 */</span></div><div class='line' id='LC697'>	<span class="kd">function</span> <span class="nx">_prefix</span><span class="p">(</span><span class="nx">property</span><span class="p">,</span> <span class="nx">value</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC698'>		<span class="kd">var</span> <span class="nx">r</span> <span class="o">=</span> <span class="p">{};</span></div><div class='line' id='LC699'><br/></div><div class='line' id='LC700'>		<span class="nx">r</span><span class="p">[</span><span class="s2">&quot;-webkit-&quot;</span> <span class="o">+</span> <span class="nx">property</span><span class="p">]</span> <span class="o">=</span> <span class="nx">value</span><span class="p">;</span></div><div class='line' id='LC701'>		<span class="nx">r</span><span class="p">[</span>   <span class="s2">&quot;-moz-&quot;</span> <span class="o">+</span> <span class="nx">property</span><span class="p">]</span> <span class="o">=</span> <span class="nx">value</span><span class="p">;</span></div><div class='line' id='LC702'>		<span class="nx">r</span><span class="p">[</span>    <span class="s2">&quot;-ms-&quot;</span> <span class="o">+</span> <span class="nx">property</span><span class="p">]</span> <span class="o">=</span> <span class="nx">value</span><span class="p">;</span></div><div class='line' id='LC703'>		<span class="nx">r</span><span class="p">[</span>     <span class="s2">&quot;-o-&quot;</span> <span class="o">+</span> <span class="nx">property</span><span class="p">]</span> <span class="o">=</span> <span class="nx">value</span><span class="p">;</span></div><div class='line' id='LC704'>		<span class="nx">r</span><span class="p">[</span>             <span class="nx">property</span><span class="p">]</span> <span class="o">=</span> <span class="nx">value</span><span class="p">;</span></div><div class='line' id='LC705'><br/></div><div class='line' id='LC706'>		<span class="k">return</span> <span class="nx">r</span><span class="p">;</span></div><div class='line' id='LC707'>	<span class="p">}</span></div><div class='line' id='LC708'><br/></div><div class='line' id='LC709'>	<span class="cm">/**</span></div><div class='line' id='LC710'><span class="cm">	 * @method private</span></div><div class='line' id='LC711'><span class="cm">	 * @name _startTimer</span></div><div class='line' id='LC712'><span class="cm">	 * @description Starts an internal timer</span></div><div class='line' id='LC713'><span class="cm">	 * @param timer [int] &quot;Timer ID&quot;</span></div><div class='line' id='LC714'><span class="cm">	 * @param time [int] &quot;Time until execution&quot;</span></div><div class='line' id='LC715'><span class="cm">	 * @param callback [int] &quot;Function to execute&quot;</span></div><div class='line' id='LC716'><span class="cm">	 * @param interval [boolean] &quot;Flag for recurring interval&quot;</span></div><div class='line' id='LC717'><span class="cm">	 */</span></div><div class='line' id='LC718'>	<span class="kd">function</span> <span class="nx">_startTimer</span><span class="p">(</span><span class="nx">timer</span><span class="p">,</span> <span class="nx">time</span><span class="p">,</span> <span class="nx">func</span><span class="p">,</span> <span class="nx">interval</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC719'>		<span class="nx">_clearTimer</span><span class="p">(</span><span class="nx">timer</span><span class="p">,</span> <span class="nx">interval</span><span class="p">);</span></div><div class='line' id='LC720'>		<span class="k">if</span> <span class="p">(</span><span class="nx">interval</span> <span class="o">===</span> <span class="kc">true</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC721'>			<span class="k">return</span> <span class="nx">setInterval</span><span class="p">(</span><span class="nx">func</span><span class="p">,</span> <span class="nx">time</span><span class="p">);</span></div><div class='line' id='LC722'>		<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC723'>			<span class="k">return</span> <span class="nx">setTimeout</span><span class="p">(</span><span class="nx">func</span><span class="p">,</span> <span class="nx">time</span><span class="p">);</span></div><div class='line' id='LC724'>		<span class="p">}</span></div><div class='line' id='LC725'>	<span class="p">}</span></div><div class='line' id='LC726'><br/></div><div class='line' id='LC727'>	<span class="cm">/**</span></div><div class='line' id='LC728'><span class="cm">	 * @method private</span></div><div class='line' id='LC729'><span class="cm">	 * @name _clearTimer</span></div><div class='line' id='LC730'><span class="cm">	 * @description Clears an internal timer</span></div><div class='line' id='LC731'><span class="cm">	 * @param timer [int] &quot;Timer ID&quot;</span></div><div class='line' id='LC732'><span class="cm">	 */</span></div><div class='line' id='LC733'>	<span class="kd">function</span> <span class="nx">_clearTimer</span><span class="p">(</span><span class="nx">timer</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC734'>		<span class="k">if</span> <span class="p">(</span><span class="nx">timer</span> <span class="o">!==</span> <span class="kc">null</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC735'>			<span class="nx">clearInterval</span><span class="p">(</span><span class="nx">timer</span><span class="p">);</span></div><div class='line' id='LC736'>			<span class="nx">timer</span> <span class="o">=</span> <span class="kc">null</span><span class="p">;</span></div><div class='line' id='LC737'>		<span class="p">}</span></div><div class='line' id='LC738'>	<span class="p">}</span></div><div class='line' id='LC739'><br/></div><div class='line' id='LC740'>	<span class="nx">$</span><span class="p">.</span><span class="nx">fn</span><span class="p">.</span><span class="nx">roller</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">method</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC741'>		<span class="k">if</span> <span class="p">(</span><span class="nx">pub</span><span class="p">[</span><span class="nx">method</span><span class="p">])</span> <span class="p">{</span></div><div class='line' id='LC742'>			<span class="k">return</span> <span class="nx">pub</span><span class="p">[</span><span class="nx">method</span><span class="p">].</span><span class="nx">apply</span><span class="p">(</span><span class="k">this</span><span class="p">,</span> <span class="nb">Array</span><span class="p">.</span><span class="nx">prototype</span><span class="p">.</span><span class="nx">slice</span><span class="p">.</span><span class="nx">call</span><span class="p">(</span><span class="nx">arguments</span><span class="p">,</span> <span class="mi">1</span><span class="p">));</span></div><div class='line' id='LC743'>		<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="k">typeof</span> <span class="nx">method</span> <span class="o">===</span> <span class="s1">&#39;object&#39;</span> <span class="o">||</span> <span class="o">!</span><span class="nx">method</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC744'>			<span class="k">return</span> <span class="nx">_init</span><span class="p">.</span><span class="nx">apply</span><span class="p">(</span><span class="k">this</span><span class="p">,</span> <span class="nx">arguments</span><span class="p">);</span></div><div class='line' id='LC745'>		<span class="p">}</span></div><div class='line' id='LC746'>		<span class="k">return</span> <span class="k">this</span><span class="p">;</span></div><div class='line' id='LC747'>	<span class="p">};</span></div><div class='line' id='LC748'><br/></div><div class='line' id='LC749'>	<span class="nx">$</span><span class="p">.</span><span class="nx">roller</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">method</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC750'>		<span class="k">if</span> <span class="p">(</span><span class="nx">method</span> <span class="o">===</span> <span class="s2">&quot;defaults&quot;</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC751'>			<span class="nx">pub</span><span class="p">.</span><span class="nx">defaults</span><span class="p">.</span><span class="nx">apply</span><span class="p">(</span><span class="k">this</span><span class="p">,</span> <span class="nb">Array</span><span class="p">.</span><span class="nx">prototype</span><span class="p">.</span><span class="nx">slice</span><span class="p">.</span><span class="nx">call</span><span class="p">(</span><span class="nx">arguments</span><span class="p">,</span> <span class="mi">1</span><span class="p">));</span></div><div class='line' id='LC752'>		<span class="p">}</span></div><div class='line' id='LC753'>	<span class="p">};</span></div><div class='line' id='LC754'><span class="p">})(</span><span class="nx">jQuery</span><span class="p">,</span> <span class="nb">window</span><span class="p">);</span></div></pre></div></td>
          </tr>
        </table>
  </div>

  </div>
</div>

<a href="#jump-to-line" rel="facebox[.linejump]" data-hotkey="l" class="js-jump-to-line" style="display:none">Jump to Line</a>
<div id="jump-to-line" style="display:none">
  <form accept-charset="UTF-8" class="js-jump-to-line-form">
    <input class="linejump-input js-jump-to-line-field" type="text" placeholder="Jump to line&hellip;" autofocus>
    <button type="submit" class="button">Go</button>
  </form>
</div>

        </div>

      </div><!-- /.repo-container -->
      <div class="modal-backdrop"></div>
    </div><!-- /.container -->
  </div><!-- /.site -->


    </div><!-- /.wrapper -->

      <div class="container">
  <div class="site-footer">
    <ul class="site-footer-links right">
      <li><a href="https://status.github.com/">Status</a></li>
      <li><a href="http://developer.github.com">API</a></li>
      <li><a href="http://training.github.com">Training</a></li>
      <li><a href="http://shop.github.com">Shop</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/about">About</a></li>

    </ul>

    <a href="/">
      <span class="mega-octicon octicon-mark-github" title="GitHub"></span>
    </a>

    <ul class="site-footer-links">
      <li>&copy; 2014 <span title="0.03339s from github-fe126-cp1-prd.iad.github.net">GitHub</span>, Inc.</li>
        <li><a href="/site/terms">Terms</a></li>
        <li><a href="/site/privacy">Privacy</a></li>
        <li><a href="/security">Security</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
  </div><!-- /.site-footer -->
</div><!-- /.container -->


    <div class="fullscreen-overlay js-fullscreen-overlay" id="fullscreen_overlay">
  <div class="fullscreen-container js-fullscreen-container">
    <div class="textarea-wrap">
      <textarea name="fullscreen-contents" id="fullscreen-contents" class="js-fullscreen-contents" placeholder="" data-suggester="fullscreen_suggester"></textarea>
    </div>
  </div>
  <div class="fullscreen-sidebar">
    <a href="#" class="exit-fullscreen js-exit-fullscreen tooltipped tooltipped-w" aria-label="Exit Zen Mode">
      <span class="mega-octicon octicon-screen-normal"></span>
    </a>
    <a href="#" class="theme-switcher js-theme-switcher tooltipped tooltipped-w"
      aria-label="Switch themes">
      <span class="octicon octicon-color-mode"></span>
    </a>
  </div>
</div>



    <div id="ajax-error-message" class="flash flash-error">
      <span class="octicon octicon-alert"></span>
      <a href="#" class="octicon octicon-remove-close close js-ajax-error-dismiss"></a>
      Something went wrong with that request. Please try again.
    </div>

  </body>
</html>

