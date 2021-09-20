package ca.bertsa.cal.waterleak.services;

import static android.content.Context.NOTIFICATION_SERVICE;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;
import androidx.work.Data;
import androidx.work.ForegroundInfo;
import androidx.work.WorkManager;
import androidx.work.Worker;
import androidx.work.WorkerParameters;

import ca.bertsa.cal.waterleak.R;

public class MyWorker extends Worker {
    private static final String KEY_INPUT_URL = "KEY_INPUT_URL";
    private static final String KEY_OUTPUT_FILE_NAME = "KEY_OUTPUT_FILE_NAME";
    private static final String TAG = "MyWorker";
    private NotificationManager notificationManager;

    public MyWorker(@NonNull Context appContext, @NonNull WorkerParameters workerParams) {
        super(appContext, workerParams);
        notificationManager = (NotificationManager)
                appContext.getSystemService(NOTIFICATION_SERVICE);
    }

    @NonNull
    @Override
    public Result doWork() {
        Log.d(TAG, "Performing long running task in scheduled job");
        Data inputData = getInputData();
        String progress = "Starting Download";
        return Result.success();
        // TODO(developer): add long running task here.
    }

    @NonNull
    private ForegroundInfo createForegroundInfo(@NonNull String progress) {
        // Build a notification using bytesRead and contentLength

        Context context = getApplicationContext();
        String id = context.getString(R.string.default_notification_channel_id);
        String title = context.getString(R.string.fcm_fallback_notification_channel_label);
        PendingIntent intent = WorkManager.getInstance(context)
                .createCancelPendingIntent(getId());

        createChannel();

        Notification notification = new NotificationCompat.Builder(context, id)
                .setContentTitle(title)
                .setTicker(title)
                .setSmallIcon(R.drawable.ic_stat_notification)
                .setOngoing(true)
                // Add the cancel action to the notification which can
                // be used to cancel the worker
                .addAction(android.R.drawable.ic_delete, "Close", intent)
                .build();

        return new ForegroundInfo(1,notification);
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private void createChannel() {
        // Create a Notification channel
    }
}
