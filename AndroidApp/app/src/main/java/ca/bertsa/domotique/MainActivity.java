package ca.bertsa.domotique;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.media.AudioAttributes;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.widget.TableRow;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationCompat;

import com.google.firebase.messaging.FirebaseMessaging;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = MainActivity.class.getSimpleName();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        DeviceButton button = new DeviceButton(this, "Valve");


        ((TableRow) findViewById(R.id.row2)).addView(button);

        setNotificationChannels();
        setFirebase();
    }

    private void setFirebase() {
        FirebaseMessaging.getInstance()
                .getToken()
                .addOnCompleteListener(task -> {
                    if (!task.isSuccessful()) {
                        Log.w(TAG, "Fetching FCM registration token failed", task.getException());
                        return;
                    }

                    String token = task.getResult();

                    String msg = getString(R.string.msg_token_fmt, token);
                    Log.d(TAG, msg);
                });
        String topic = "waterleak";
        FirebaseMessaging.getInstance()
                .subscribeToTopic(topic)
                .addOnCompleteListener(task -> {
                    String msg;
                    if (task.isSuccessful())
                        msg = getString(R.string.msg_subscribed, topic);
                    else
                        msg = getString(R.string.msg_subscribe_failed, topic);

                    Log.d(TAG, msg);
                });
    }

    private void setNotificationChannels() {
        NotificationManager notificationManager =
                (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

        NotificationChannel channel = new NotificationChannel("waterleak", "WaterLeak", NotificationManager.IMPORTANCE_HIGH);
        channel.setLockscreenVisibility(NotificationCompat.VISIBILITY_PUBLIC);
        channel.setBypassDnd(true);
        channel.enableVibration(true);
        Uri soundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM);
        if (soundUri != null) {
            AudioAttributes audioAttributes = new AudioAttributes.Builder()
                    .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                    .setUsage(AudioAttributes.USAGE_ALARM)
                    .build();
            channel.setSound(soundUri, audioAttributes);
        }

        channel.setDescription("description");
        notificationManager.createNotificationChannel(channel);


        channel = new NotificationChannel("laundry", "Laundry", NotificationManager.IMPORTANCE_HIGH);
        channel.setLockscreenVisibility(NotificationCompat.VISIBILITY_PUBLIC);
        channel.setBypassDnd(true);
        channel.enableVibration(true);
        soundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        if (soundUri != null) {
            AudioAttributes audioAttributes = new AudioAttributes.Builder()
                    .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                    .setUsage(AudioAttributes.USAGE_NOTIFICATION)
                    .build();
            channel.setSound(soundUri, audioAttributes);
        }

        channel.setDescription("description");
        notificationManager.createNotificationChannel(channel);
    }
}