package ca.bertsa.domotique.models.devices;

import android.content.Context;
import android.content.res.Resources;
import android.graphics.Color;
import android.util.AttributeSet;
import android.widget.TableRow;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.google.android.material.button.MaterialButton;

import ca.bertsa.domotique.R;

public class DeviceButton extends MaterialButton {

    private static final int COLOR_OUTLINE = -16777216;
    private final boolean toggleable;

    public DeviceButton(@NonNull Context context, String text, boolean toggleable) {
        super(context, null, R.attr.materialButtonOutlinedStyle);
        this.toggleable = toggleable;

        setSingleLine();
        TableRow.LayoutParams param = new TableRow.LayoutParams(0, 300, 1.0f);
        setLayoutParams(param);
        setAllCaps(true);
        setText(text);
    }

    public DeviceButton(@NonNull Context context) {
        super(context, null, R.attr.materialButtonOutlinedStyle);
        TableRow.LayoutParams param = new TableRow.LayoutParams(0, 300, 1.0f);
        setLayoutParams(param);
        setEnabled(false);
        setText("+");
        toggleable = false;
    }

    public DeviceButton(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        toggleable = false;
    }

    public DeviceButton(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        toggleable = false;
    }

    @Override
    public void toggle() {
        super.toggle();
        if (!toggleable) return;
        setActivated(!isActivated());
    }

    @Override
    public void setActivated(boolean activated) {
        super.setActivated(activated);
        final Resources.Theme theme = getContext().getTheme();
        if (activated) {
            setTextColor(getResources().getColor(R.color.design_default_color_on_primary, theme));
            setBackgroundColor(getResources().getColor(R.color.domo_primary_800, theme));
            setOutlineAmbientShadowColor(Color.TRANSPARENT);
            setOutlineSpotShadowColor(Color.TRANSPARENT);
        } else {
            setTextColor(getResources().getColor(R.color.domo_primary_300, theme));
            setBackgroundColor(Color.TRANSPARENT);
            setOutlineAmbientShadowColor(COLOR_OUTLINE);
            setOutlineSpotShadowColor(COLOR_OUTLINE);
        }
    }

}
