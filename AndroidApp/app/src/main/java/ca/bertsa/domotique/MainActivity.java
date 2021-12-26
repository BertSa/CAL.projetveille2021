package ca.bertsa.domotique;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.media.AudioAttributes;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationCompat;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.messaging.FirebaseMessaging;

import java.util.ArrayList;
import java.util.List;

import ca.bertsa.domotique.models.devices.Device;
import ca.bertsa.domotique.models.devices.DeviceButton;
import ca.bertsa.domotique.models.devices.DevicesTable;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = MainActivity.class.getSimpleName();
    List<Device> devices = new ArrayList<>();
    DevicesTable tableLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        tableLayout = findViewById(R.id.table);
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

        FirebaseDatabase.getInstance().getReference(getString(R.string.database_ref_path))
                .addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                        dataSnapshot.getChildren().forEach(data -> {
                            Device device = data.getValue(Device.class);
                            if (device != null) {
                                devices.add(device);
                                DeviceButton deviceButton = new DeviceButton(MainActivity.this, device.getTitle(), device.isToggleable());

                                DatabaseReference statusRef = data.getRef().child(getString(R.string.status));
                                statusRef.addValueEventListener(new ValueEventListener() {
                                    @Override
                                    public void onDataChange(@NonNull DataSnapshot mstatus) {
                                        Boolean status = mstatus.getValue(boolean.class);
                                        if (status == null)
                                            return;
                                        deviceButton.setActivated(status);
                                    }

                                    @Override
                                    public void onCancelled(@NonNull DatabaseError error) {

                                    }
                                });

                                deviceButton.setOnClickListener(view -> statusRef.setValue(deviceButton.isActivated()));
                                tableLayout.addItem(deviceButton);
                            }
                        });

                        for (Device device : devices) {
                            subscribeToTopic(device.getTopic());
                        }
                    }

                    @Override
                    public void onCancelled(@NonNull DatabaseError error) {

                    }
                });
    }

    private void subscribeToTopic(String topic) {
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