
// isotope
// external js: isotope.pkgd.js

// filter functions
var filterFns = {
  // show if number is greater than 50
  numberGreaterThan50: function() {
    var number = $(this).find('.number').text();
    return parseInt( number, 10 ) > 50;
  },
  // show if name ends with -ium
  ium: function() {
    var name = $(this).find('.name').text();
    return name.match( /ium$/ );
  }
};

function getHashFilter() {
  // get filter=filterName
  var matches = location.hash.match( /filter=([^&]+)/i );
  var hashFilter = matches && matches[1];
  return hashFilter && decodeURIComponent( hashFilter );
}

// init Isotope
var $grid = $('.grid');

// bind filter button click
var $filterList = $('.filter-list'),
    $filterListCat = $('.filter-list-cat'),
    $filterSelect = $('.filter-select');

// PCの絞り込みリスト
$filterList.on('click', '.filter-list-cat', function() {
  var filterAttr = $(this).attr('data-filter');
  var idx = $filterListCat.index(this);
  $filterSelect.prop('selectedIndex', idx);

  // set filter in hash
  location.hash = 'filter=' + encodeURIComponent(filterAttr);
});

// SPの絞り込みリスト
$filterSelect.on('change', function() {
  var idx = $(this).prop('selectedIndex'),
      $targetCat = $filterListCat.eq(idx),
      filterAttr = $targetCat.attr('data-filter');

  $filterListCat.removeClass('is-checked');
  $targetCat.eq(idx).addClass('is-checked');

  // set filter in hash
  location.hash = 'filter=' + encodeURIComponent(filterAttr);
});

var isIsotopeInit = false;

function onHashchange() {
  var hashFilter = getHashFilter();
  if ( !hashFilter && isIsotopeInit ) {
    return;
  }
  isIsotopeInit = true;
  // filter isotope
  $grid.isotope({
    itemSelector: '.element-item',
    layoutMode: 'fitRows',
    // use filterFns
    filter: filterFns[ hashFilter ] || hashFilter
  });
  // set selected class on button
  if ( hashFilter ) {
    $filterList.find('.is-checked').removeClass('is-checked');
    $filterList.find('[data-filter="' + hashFilter + '"]').addClass('is-checked');

    // SP用の絞り込みリストにも反映
    var idx = $filterListCat.index($filterList.find('.is-checked'));
    $filterSelect.prop('selectedIndex', idx);
  }
}

$(window).on( 'hashchange', onHashchange );

// trigger event handler to init Isotope
onHashchange();
