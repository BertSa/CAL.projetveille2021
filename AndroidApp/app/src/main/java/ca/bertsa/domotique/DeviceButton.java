package ca.bertsa.domotique;

import android.content.Context;
import android.widget.TableRow;

import androidx.annotation.NonNull;

import com.google.android.material.button.MaterialButton;

public class DeviceButton extends MaterialButton {

    public DeviceButton(@NonNull Context context,String text) {
        super(context);
        setSingleLine();
        TableRow.LayoutParams param = new TableRow.LayoutParams(0, -1, 1.0f);
        setLayoutParams(param);
        setAllCaps(true);
        setText(text);
    }

    public DeviceButton(@NonNull Context context) {
        super(context);
    }

}
