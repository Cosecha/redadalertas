#!/usr/bin/env bash

# Setting up ENV
echo SERVICE_API_URL=$SERVICE_API_URL > .env
printf ".env created with contents:\n"
cat .env

# Create Firebase plist file
PLIST="${BUILD_REPOSITORY_LOCALPATH}/ios/Redadalertas/GoogleService-Info.plist"

/usr/libexec/PlistBuddy -c "Add :API_KEY string" -c "Set :API_KEY ${FIREBASE_API_KEY}" $PLIST
/usr/libexec/PlistBuddy -c "Add :BUNDLE_ID string" -c "Set :BUNDLE_ID ${BUNDLE_ID}" $PLIST
/usr/libexec/PlistBuddy -c "Add :CLIENT_ID string" -c "Set :CLIENT_ID ${FIREBASE_CLIENT_ID}" $PLIST
/usr/libexec/PlistBuddy -c "Add :DATABASE_URL string" -c "Set :DATABASE_URL ${FIREBASE_DATABASE_URL}" $PLIST
/usr/libexec/PlistBuddy -c "Add :GCM_SENDER_ID string" -c "Set :GCM_SENDER_ID ${GCM_SENDER_ID}" $PLIST
/usr/libexec/PlistBuddy -c "Add :GOOGLE_APP_ID string" -c "Set :GOOGLE_APP_ID ${GOOGLE_APP_ID}" $PLIST
/usr/libexec/PlistBuddy -c "Add :IS_ADS_ENABLED bool" -c "Set :IS_ADS_ENABLED false" $PLIST
/usr/libexec/PlistBuddy -c "Add :IS_ANALYTICS_ENABLED bool" -c "Set :IS_ANALYTICS_ENABLED false" $PLIST
/usr/libexec/PlistBuddy -c "Add :IS_APPINVITE_ENABLED bool" -c "Set :IS_APPINVITE_ENABLED true" $PLIST
/usr/libexec/PlistBuddy -c "Add :IS_GCM_ENABLED bool" -c "Set :IS_GCM_ENABLED true" $PLIST
/usr/libexec/PlistBuddy -c "Add :IS_SIGNIN_ENABLED bool" -c "Set :IS_SIGNIN_ENABLED true" $PLIST
/usr/libexec/PlistBuddy -c "Add :PLIST_VERSION string" -c "Set :PLIST_VERSION 1" $PLIST
/usr/libexec/PlistBuddy -c "Add :PROJECT_ID string" -c "Set :PROJECT_ID ${FIREBASE_PROJECT_ID}" $PLIST
/usr/libexec/PlistBuddy -c "Add :REVERSED_CLIENT_ID string" -c "Set :REVERSED_CLIENT_ID ${FIREBASE_REVERSED_CLIENT_ID}" $PLIST
/usr/libexec/PlistBuddy -c "Add :STORAGE_BUCKET string" -c "Set :STORAGE_BUCKET ${FIREBASE_STORAGE_BUCKET}" $PLIST

cat $PLIST
echo "Created GoogleService-Info.plist!"
