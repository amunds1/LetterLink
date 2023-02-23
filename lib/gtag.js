export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

/* 

  Send user ID to Google Analytics by setting user_id in gtag config
  https://developers.google.com/analytics/devguides/collection/ga4/user-id?client_type=gtag

*/
export const pageview = (url, userID) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
    user_id: userID,
  })
}

/* export const setUserID = (userID) => {
  window.gtag('config', GA_TRACKING_ID, {})
} */

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
