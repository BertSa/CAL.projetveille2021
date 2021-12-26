package ca.bertsa.domotique.devices;

import android.content.Context;
import android.graphics.Color;
import android.util.AttributeSet;
import android.util.Log;
import android.widget.TableRow;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.google.android.material.button.MaterialButton;

import ca.bertsa.domotique.R;

public class DeviceButton extends MaterialButton {

    public DeviceButton(@NonNull Context context, String text) {
        super(context, null, R.attr.materialButtonOutlinedStyle);
        setSingleLine();
        TableRow.LayoutParams param = new TableRow.LayoutParams(0, 300, 1.0f);
        setLayoutParams(param);
        setAllCaps(true);
        setText(text);

        setOnClickListener(view -> toggle(!isActivated()));
    }

    public DeviceButton(@NonNull Context context) {
        super(context,null, R.attr.materialButtonOutlinedStyle);
        TableRow.LayoutParams param = new TableRow.LayoutParams(0, 300, 1.0f);
        setLayoutParams(param);
        setEnabled(false);
        setText("+");
    }

    public DeviceButton(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
    }

    public DeviceButton(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    private void toggle(boolean activated) {
        setActivated(activated);
        if (activated) {
            setTextColor(getResources().getColor(R.color.design_default_color_on_primary, getContext().getTheme()));
            setBackgroundColor(getResources().getColor(R.color.domo_primary_800, getContext().getTheme()));
            setOutlineAmbientShadowColor(Color.TRANSPARENT);
            setOutlineSpotShadowColor(Color.TRANSPARENT);
        } else {
            setTextColor(getResources().getColor(R.color.domo_primary_300, getContext().getTheme()));
            setBackgroundColor(Color.TRANSPARENT);
            setOutlineAmbientShadowColor(-16777216);
            setOutlineSpotShadowColor(-16777216);
        }
    }

}
