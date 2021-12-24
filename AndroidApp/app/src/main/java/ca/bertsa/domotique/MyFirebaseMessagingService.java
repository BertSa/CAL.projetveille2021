package ca.bertsa.domotique;

import android.annotation.SuppressLint;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.util.Map;

public class MyFirebaseMessagingService extends FirebaseMessagingService {

    private static final String TAG = MyFirebaseMessagingService.class.getSimpleName();

    /**
     * Called when message is received.
     *
     * @param remoteMessage Object representing the message received from Firebase Cloud Messaging.
     */
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        Log.d(TAG, "From: " + remoteMessage.getFrom());
        Map<String, String> data = remoteMessage.getData();

        if (data.size() <= 0) return;

        Log.d(TAG, "Message data payload: " + data);
        handleNow(data);
    }

    @Override
    public void onNewToken(@NonNull String token) {
        Log.d(TAG, "Refreshed token: " + token);
    }

    /**
     * Handle time allotted to BroadcastReceivers.
     *
     * @param data Data from RemoteMessage FCM
     */
    private void handleNow(Map<String, String> data) {
        String channelId = data.get("channelId");
        String title = data.get("title");
        String text = data.get("text");

        if (channelId == null) {
            Log.wtf(TAG, "The channelId is not specified...");
            return;
        }
        if (title == null) {
            Log.wtf(TAG, "The title is not specified...");
            return;
        }
        if (text == null) {
            Log.wtf(TAG, "The text is not specified...");
            return;
        }

        switch (channelId) {
            case "laundry":
                sendNotification(channelId, title, text);
                break;
            case "waterleak":
                sendFullscreenNotification(channelId, title, text);
                break;
        }
        Log.d(TAG, "Task is done.");
    }

    /**
     * Create and show a fullscreen notification containing the received FCM message.
     *
     * @param channelId Channel id of the notification
     * @param title     Title of the notification
     * @param text      FCM message body received.
     */
    private void sendFullscreenNotification(String channelId, String title, String text) {
        Intent intent = new Intent(this, LockScreenActivity.class);
        @SuppressLint("UnspecifiedImmutableFlag")
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_ONE_SHOT);
        NotificationCompat.Builder builder = getDefaultNotification(channelId, title, text, pendingIntent)
                .setLargeIcon(BitmapFactory.decodeResource(getResources(), R.mipmap.ic_launcher))
                .setFullScreenIntent(pendingIntent, true)
                .setCategory(NotificationCompat.CATEGORY_ALARM);

        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.notify(0, builder.build());
    }

    /**
     * Create and show a simple notification containing the received FCM message.
     *
     * @param channelId Channel id of the notification
     * @param title     Title of the notification
     * @param text      FCM message body received.
     */
    private void sendNotification(String channelId, String title, String text) {
        Intent intent = new Intent(this, MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        @SuppressLint("UnspecifiedImmutableFlag")
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_ONE_SHOT);

        NotificationCompat.Builder notificationBuilder = getDefaultNotification(channelId, title, text, pendingIntent)
                .setCategory(NotificationCompat.CATEGORY_REMINDER);

        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.notify(0, notificationBuilder.build());
    }

    /**
     * @param category      Channel id of the notification
     * @param title         Title of the notification
     * @param text          Text displayed in the notification
     * @param pendingIntent Pending intent
     * @return Return a basic notification
     */
    @NonNull
    private NotificationCompat.Builder getDefaultNotification(String category, String title, String text, PendingIntent pendingIntent) {
        return new NotificationCompat.Builder(this, category)
                .setContentIntent(pendingIntent)
                .setDefaults(Notification.DEFAULT_ALL)
                .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setSmallIcon(android.R.drawable.ic_dialog_alert)
                .setContentTitle(title)
                .setContentText(text);
    }
}
