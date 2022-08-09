module.exports.fetchData = async (requestParams) => {
  try {
    console.log("requestParams -> ", JSON.stringify(requestParams, null, 2));
    var axios = require("axios");
    var data = JSON.stringify({
      operationName: "SearchRequestQuery",
      variables: {
        filterCounts: true,
        request: {
          paging: {
            page: 1,
            pageSize: 5,
          },
          filterVersion: "1",
          filters: [],
          coreFilters: {
            maxBathrooms: requestParams.maxBathrooms,
            maxBedrooms: requestParams.maxBedrooms,
            maxNightlyPrice: null,
            maxTotalPrice: null,
            minBathrooms: requestParams.minBathrooms,
            minBedrooms: requestParams.minBedrooms,
            minNightlyPrice: 0,
            minTotalPrice: null,
            pets: 0,
          },
          boundingBox: {
            maxLat: requestParams.maxLatitude,
            maxLng: requestParams.maxLongitude,
            minLat: requestParams.minLatitude,
            minLng: requestParams.minLongitude,
          },
          q: requestParams.regionToSearchFor,
        },
        vrbo_web_global_messaging_alert: true,
        vrbo_web_global_messaging_banner: true,
        Vrbo_reco_large_search_destino: false,
      },
      extensions: {
        isPageLoadSearch: false,
      },
      query:
        'query SearchRequestQuery($request: SearchResultRequest!, $filterCounts: Boolean!, $vrbo_web_global_messaging_alert: Boolean!, $vrbo_web_global_messaging_banner: Boolean!, $Vrbo_reco_large_search_destino: Boolean!) {\n  results: search(request: $request) {\n    ...querySelectionSet\n    ...DestinationBreadcrumbsSearchResult\n    ...DestinationCarouselSearchResult @include(if: $Vrbo_reco_large_search_destino)\n    ...DestinationMessageSearchResult\n    ...FilterCountsSearchRequestResult\n    ...HitCollectionSearchResult\n    ...ADLSearchResult\n    ...MapSearchResult\n    ...ExpandedGroupsSearchResult\n    ...PagerSearchResult\n    ...SearchTermCarouselSearchResult\n    ...InternalToolsSearchResult\n    ...SEOMetaDataParamsSearchResult\n    ...GlobalInlineMessageSearchResult @include(if: $vrbo_web_global_messaging_alert)\n    ...GlobalBannerContainerSearchResult @include(if: $vrbo_web_global_messaging_banner)\n    ...FlexibleDatesSearchResult\n    __typename\n  }\n  ...RequestMarkerFragment\n}\n\nfragment querySelectionSet on SearchResult {\n  id\n  typeaheadSuggestion {\n    uuid\n    term\n    name\n    __typename\n  }\n  geography {\n    lbsId\n    gaiaId\n    location {\n      latitude\n      longitude\n      __typename\n    }\n    isGeocoded\n    shouldShowMapCentralPin\n    __typename\n  }\n  propertyRedirectUrl\n  __typename\n}\n\nfragment DestinationBreadcrumbsSearchResult on SearchResult {\n  destination {\n    breadcrumbs {\n      name\n      url\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment DestinationCarouselSearchResult on SearchResult {\n  destinationRecommendationResponse(size: 8, target: SERP_LARGE_SEARCH_TERM_DESTINATION) {\n    ...DestinationCarouselRecommendedDestinationResponse\n    __typename\n  }\n  __typename\n}\n\nfragment DestinationCarouselRecommendedDestinationResponse on RecommendedDestinationResponse {\n  clientRequestId\n  recommendedDestinations {\n    searchTermUuid\n    imageHref\n    recommendationModel\n    breadcrumbs {\n      place {\n        name {\n          simple\n          full\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment HitCollectionSearchResult on SearchResult {\n  page\n  pageSize\n  queryUUID\n  listings {\n    ...HitListing\n    __typename\n  }\n  pinnedListing {\n    headline\n    listing {\n      ...HitListing\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment HitListing on Listing {\n  virtualTourBadge {\n    name\n    id\n    helpText\n    __typename\n  }\n  amenitiesBadges {\n    name\n    id\n    helpText\n    __typename\n  }\n  multiUnitProperty\n  images {\n    altText\n    c6_uri\n    c9_uri\n    mab {\n      banditId\n      payloadId\n      campaignId\n      cached\n      arm {\n        level\n        imageUrl\n        categoryName\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  ...HitInfoListing\n  __typename\n}\n\nfragment HitInfoListing on Listing {\n  listingId\n  ...HitInfoDesktopListing\n  ...HitInfoMobileListing\n  ...PriceListing\n  __typename\n}\n\nfragment HitInfoDesktopListing on Listing {\n  detailPageUrl\n  instantBookable\n  minStayRange {\n    minStayHigh\n    minStayLow\n    __typename\n  }\n  listingId\n  rankedBadges(rankingStrategy: SERP) {\n    id\n    helpText\n    name\n    __typename\n  }\n  propertyId\n  propertyMetadata {\n    headline\n    __typename\n  }\n  superlativesBadges: rankedBadges(rankingStrategy: SERP_SUPERLATIVES) {\n    id\n    helpText\n    name\n    __typename\n  }\n  unitMetadata {\n    unitName\n    __typename\n  }\n  webRatingBadges: rankedBadges(rankingStrategy: SRP_WEB_RATING) {\n    id\n    helpText\n    name\n    __typename\n  }\n  ...DetailsListing\n  ...GeoDistanceListing\n  ...PriceListing\n  ...RatingListing\n  ...UrgencyMessageListing\n  ...MultiUnitHitListing\n  __typename\n}\n\nfragment DetailsListing on Listing {\n  bathrooms {\n    full\n    half\n    toiletOnly\n    __typename\n  }\n  bedrooms\n  propertyType\n  sleeps\n  petsAllowed\n  spaces {\n    spacesSummary {\n      area {\n        areaValue\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment GeoDistanceListing on Listing {\n  geoDistance {\n    text\n    relationType\n    __typename\n  }\n  __typename\n}\n\nfragment PriceListing on Listing {\n  priceSummary: priceSummary {\n    priceAccurate\n    ...PriceSummaryTravelerPriceSummary\n    __typename\n  }\n  priceSummarySecondary: priceSummary(summary: "displayPriceSecondary") {\n    ...PriceSummaryTravelerPriceSummary\n    __typename\n  }\n  priceLabel: priceSummary(summary: "priceLabel") {\n    priceTypeId\n    pricePeriodDescription\n    __typename\n  }\n  __typename\n}\n\nfragment PriceSummaryTravelerPriceSummary on TravelerPriceSummary {\n  priceTypeId\n  edapEventJson\n  formattedAmount\n  roundedFormattedAmount\n  pricePeriodDescription\n  __typename\n}\n\nfragment RatingListing on Listing {\n  averageRating\n  reviewCount\n  __typename\n}\n\nfragment UrgencyMessageListing on Listing {\n  unitMessage(assetVersion: 1) {\n    ...UnitMessageUnitMessage\n    __typename\n  }\n  __typename\n}\n\nfragment UnitMessageUnitMessage on UnitMessage {\n  iconText {\n    message\n    icon\n    messageValueType\n    __typename\n  }\n  __typename\n}\n\nfragment MultiUnitHitListing on Listing {\n  propertyMetadata {\n    propertyName\n    __typename\n  }\n  propertyType\n  listingId\n  ...MultiUnitDropdownListing\n  ...MultiUnitModalListing\n  __typename\n}\n\nfragment MultiUnitDropdownListing on Listing {\n  ...MultiUnitListWrapperListing\n  __typename\n}\n\nfragment MultiUnitListWrapperListing on Listing {\n  listingNamespace\n  listingNumber\n  __typename\n}\n\nfragment MultiUnitModalListing on Listing {\n  ...MultiUnitListWrapperListing\n  __typename\n}\n\nfragment HitInfoMobileListing on Listing {\n  detailPageUrl\n  instantBookable\n  minStayRange {\n    minStayHigh\n    minStayLow\n    __typename\n  }\n  listingId\n  rankedBadges(rankingStrategy: SERP) {\n    id\n    helpText\n    name\n    __typename\n  }\n  propertyId\n  propertyMetadata {\n    headline\n    __typename\n  }\n  superlativesBadges: rankedBadges(rankingStrategy: SERP_SUPERLATIVES) {\n    id\n    helpText\n    name\n    __typename\n  }\n  unitMetadata {\n    unitName\n    __typename\n  }\n  webRatingBadges: rankedBadges(rankingStrategy: SRP_WEB_RATING) {\n    id\n    helpText\n    name\n    __typename\n  }\n  ...DetailsListing\n  ...GeoDistanceListing\n  ...PriceListing\n  ...RatingListing\n  ...UrgencyMessageListing\n  ...MultiUnitHitListing\n  __typename\n}\n\nfragment ExpandedGroupsSearchResult on SearchResult {\n  expandedGroups {\n    ...ExpandedGroupExpandedGroup\n    __typename\n  }\n  __typename\n}\n\nfragment ExpandedGroupExpandedGroup on ExpandedGroup {\n  listings {\n    ...HitListing\n    ...MapHitListing\n    __typename\n  }\n  mapViewport {\n    neLat\n    neLong\n    swLat\n    swLong\n    __typename\n  }\n  __typename\n}\n\nfragment MapHitListing on Listing {\n  ...HitListing\n  geoCode {\n    latitude\n    longitude\n    __typename\n  }\n  __typename\n}\n\nfragment FilterCountsSearchRequestResult on SearchResult {\n  id\n  resultCount\n  filterGroups {\n    groupInfo {\n      name\n      id\n      __typename\n    }\n    filters {\n      count @include(if: $filterCounts)\n      checked\n      filter {\n        id\n        name\n        refineByQueryArgument\n        description\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment MapSearchResult on SearchResult {\n  mapViewport {\n    neLat\n    neLong\n    swLat\n    swLong\n    __typename\n  }\n  page\n  pageSize\n  listings {\n    ...MapHitListing\n    __typename\n  }\n  pinnedListing {\n    listing {\n      ...MapHitListing\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment PagerSearchResult on SearchResult {\n  fromRecord\n  toRecord\n  pageSize\n  pageCount\n  page\n  resultCount\n  __typename\n}\n\nfragment DestinationMessageSearchResult on SearchResult {\n  destinationMessage(assetVersion: 4) {\n    iconTitleText {\n      title\n      message\n      icon\n      messageValueType\n      link {\n        linkText\n        linkHref\n        __typename\n      }\n      __typename\n    }\n    ...DestinationMessageDestinationMessage\n    __typename\n  }\n  __typename\n}\n\nfragment DestinationMessageDestinationMessage on DestinationMessage {\n  iconText {\n    message\n    icon\n    messageValueType\n    __typename\n  }\n  __typename\n}\n\nfragment ADLSearchResult on SearchResult {\n  parsedParams {\n    q\n    coreFilters {\n      adults\n      children\n      pets\n      minBedrooms\n      maxBedrooms\n      minBathrooms\n      maxBathrooms\n      minNightlyPrice\n      maxNightlyPrice\n      minSleeps\n      __typename\n    }\n    dates {\n      arrivalDate\n      departureDate\n      __typename\n    }\n    sort\n    __typename\n  }\n  page\n  pageSize\n  pageCount\n  resultCount\n  fromRecord\n  toRecord\n  pinnedListing {\n    listing {\n      listingId\n      __typename\n    }\n    __typename\n  }\n  listings {\n    listingId\n    __typename\n  }\n  filterGroups {\n    filters {\n      checked\n      filter {\n        groupId\n        id\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  geography {\n    lbsId\n    name\n    description\n    location {\n      latitude\n      longitude\n      __typename\n    }\n    primaryGeoType\n    breadcrumbs {\n      name\n      countryCode\n      location {\n        latitude\n        longitude\n        __typename\n      }\n      primaryGeoType\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment RequestMarkerFragment on Query {\n  requestmarker\n  __typename\n}\n\nfragment SearchTermCarouselSearchResult on SearchResult {\n  discoveryXploreFeeds {\n    results {\n      id\n      title\n      items {\n        ... on SearchDiscoveryFeedItem {\n          type\n          imageHref\n          place {\n            uuid\n            name {\n              full\n              simple\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  typeaheadSuggestion {\n    name\n    __typename\n  }\n  __typename\n}\n\nfragment InternalToolsSearchResult on SearchResult {\n  internalTools {\n    searchServiceUrl\n    __typename\n  }\n  __typename\n}\n\nfragment SEOMetaDataParamsSearchResult on SearchResult {\n  page\n  resultCount\n  pageSize\n  geography {\n    name\n    lbsId\n    breadcrumbs {\n      name\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment GlobalInlineMessageSearchResult on SearchResult {\n  globalMessages {\n    ...GlobalInlineAlertGlobalMessages\n    __typename\n  }\n  __typename\n}\n\nfragment GlobalInlineAlertGlobalMessages on GlobalMessages {\n  alert {\n    action {\n      link {\n        href\n        text {\n          value\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    body {\n      text {\n        value\n        __typename\n      }\n      link {\n        href\n        text {\n          value\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    id\n    severity\n    title {\n      value\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment GlobalBannerContainerSearchResult on SearchResult {\n  globalMessages {\n    ...GlobalBannerGlobalMessages\n    __typename\n  }\n  __typename\n}\n\nfragment GlobalBannerGlobalMessages on GlobalMessages {\n  banner {\n    body {\n      text {\n        value\n        __typename\n      }\n      link {\n        href\n        text {\n          value\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    id\n    severity\n    title {\n      value\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment FlexibleDatesSearchResult on SearchResult {\n  percentBooked {\n    currentPercentBooked\n    __typename\n  }\n  __typename\n}\n',
    });

    var config = {
      method: "post",
      url: "https://www.vrbo.com/serp/g",
      headers: {
        "Content-Type": "application/json",
        Cookie:
          "DUAID=5373c622-541e-5bdc-caa8-12d11d7536e5; HMS=8f54b588-c6db-4084-a58f-b0fb59194701; MC1=GUID=5373c622541e5bdccaa812d11d7536e5; ak_bmsc=14EDE8AA97ABBCCB6C4770421E98853D~000000000000000000000000000000~YAAQbwkuF6uCuV6CAQAA2gocfRBFo89LKRR47gV53TS7RN30vSv2vIOxl12mXWXJ2aRoq51uOrC+GIOFNmpmrV5Z2QShwli5DTxGr0jzVQJJtFJAMVa/uMKg3GwkC3YoDYUv/fyHV85ZnPc7jTrLECJgpgPoybfOadk+GU+xySOQXOpsOR4hyP1yDKztwVgt7yR3IPkGN0Z2RZ2MQRzdZlRsGfy1X/q6Wjj+9+9Jq0a+y29qZc/+nwKqemHVGOdCtlmdDZTQpY4KdPoBg/Kb8r9HRiX3nt75laf5bm8FK6zAyc9+I3n8iEUHGE4mMKV/cfkzjy3z5aHKKRnVV75EWumsTfknNGHI6t8h9gTZZgOQUsPu9bKALh1f; eu-site=0; f7f6a5f1-43dd-a476-5aed-91447139f91cSL=1; ha-device-id=5373c622-541e-5bdc-caa8-12d11d7536e5; hal=ga=1&ua=1&si=1&ui=1&vi=1&pr=0; has=f7f6a5f1-43dd-a476-5aed-91447139f91c; hav=5373c622-541e-5bdc-caa8-12d11d7536e5",
      },
      data: data,
    };

    return axios(config)
      .then(function (response) {
        // console.log("resp -> ", JSON.stringify(response.data, null, 2));
        return response;
      })
      .catch(function (error) {
        console.log(error);
        return "Failed to send response!";
      });
  } catch (e) {
    console.log("Error while calling fetchDataService >> ", e);
  }
};
