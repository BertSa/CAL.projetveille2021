package ca.bertsa.domotique.models.devices;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.util.AttributeSet;
import android.view.View;
import android.widget.TableRow;

import androidx.appcompat.content.res.AppCompatResources;

import java.util.Arrays;

import ca.bertsa.domotique.R;

public class DevicesTableRow extends TableRow {
    public DevicesTableRow(Context context) {
        super(context);
        final LayoutParams layoutParams = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT);
        final Drawable dividerDrawable = AppCompatResources.getDrawable(getContext(), R.drawable.empty_tall_divider);

        setPadding(80, 0, 80, 0);
        setLayoutParams(layoutParams);
        setDividerDrawable(dividerDrawable);
        setOrientation(TableRow.HORIZONTAL);
        setShowDividers(TableRow.SHOW_DIVIDER_MIDDLE);

        DeviceButton button = new DeviceButton(context);
        button.setVisibility(INVISIBLE);

        addView(new DeviceButton(context));
        addView(button);
    }

    public DevicesTableRow(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public boolean addItem(DeviceButton item) {
        for (int index = 0; index < super.getChildCount(); index++) {
            final DeviceButton child = (DeviceButton) super.getChildAt(index);
            if (!child.isEnabled()) {
                addView(item, index);
                super.removeViewAt(super.getChildCount() - 1);
                return true;
            }
        }
        return false;
    }


    public boolean isFull() {
        for (int index = 0; index < super.getChildCount(); index++) {
            final View child = super.getChildAt(index);
            if (!child.isEnabled())
                return false;
        }
        return true;
    }
}
