package ca.bertsa.cal.waterleak;

import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.SwitchCompat;

import com.google.android.material.switchmaterial.SwitchMaterial;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

public class LeakAlert extends AppCompatActivity {
    private static final String TAG = "LeakActivity";

    private final FirebaseDatabase database = FirebaseDatabase.getInstance();
    private SwitchMaterial switchValve;
    private DatabaseReference referenceWaterLeakValve;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_leak_alert);
        switchValve = findViewById(R.id.switchValve);
        switchValve.setOnClickListener(view -> {
            if (!(view instanceof SwitchCompat))
                return;
            SwitchMaterial switchCompat = (SwitchMaterial) view;
            referenceWaterLeakValve.setValue(switchCompat.isChecked());
        });
        basicReadWrite();
    }

    public void basicReadWrite() {
        referenceWaterLeakValve = database.getReference("waterleak/valve");

        referenceWaterLeakValve.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                Boolean value = dataSnapshot.getValue(Boolean.class);
                assert value != null;
                Log.d(TAG, "Value is: " + value);
                switchValve.setChecked(value);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Log.w(TAG, "Failed to read value.", error.toException());
            }
        });
    }

}