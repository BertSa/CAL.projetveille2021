package ca.bertsa.domotique;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.firebase.messaging.FirebaseMessaging;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = MainActivity.class.getSimpleName();


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        FirebaseMessaging.getInstance().getToken()
                .addOnCompleteListener(task -> {
                    if (!task.isSuccessful()) {
                        Log.w(TAG, "Fetching FCM registration token failed", task.getException());
                        return;
                    }

                    String token = task.getResult();

                    String msg = getString(R.string.msg_token_fmt, token);
                    Log.d(TAG, msg);
//                    Toast.makeText(MainActivity.this, msg, Toast.LENGTH_SHORT).show();
                });
        FirebaseMessaging.getInstance().subscribeToTopic("leak").addOnCompleteListener(task -> {
            String msg = getString(R.string.msg_subscribed);
            if (!task.isSuccessful()) {
                msg = getString(R.string.msg_subscribe_failed);
            }
            Log.d(TAG, msg);
            Toast.makeText(MainActivity.this, msg, Toast.LENGTH_SHORT).show();
        });

    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        Intent intent_o = getIntent();
        Log.d(TAG, "OUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
    }
}