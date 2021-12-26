package ca.bertsa.domotique.devices;

import android.content.Context;
import android.util.AttributeSet;
import android.widget.TableRow;

import androidx.appcompat.content.res.AppCompatResources;

import ca.bertsa.domotique.R;

public class DevicesTableRow extends TableRow {
    public DevicesTableRow(Context context) {
        super(context);
        setPadding(80, 0, 80, 0);
        setLayoutParams(new TableRow.LayoutParams(TableRow.LayoutParams.MATCH_PARENT, TableRow.LayoutParams.WRAP_CONTENT));
        setDividerDrawable(AppCompatResources.getDrawable(getContext(), R.drawable.empty_tall_divider));
        setOrientation(TableRow.HORIZONTAL);
        setShowDividers(TableRow.SHOW_DIVIDER_MIDDLE);
        addView(new DeviceButton(context));
        DeviceButton button = new DeviceButton(context);
        button.setVisibility(INVISIBLE);
        addView(button);
    }

    public DevicesTableRow(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public boolean addItem(DeviceButton item) {
        for (int i = 0; i < getChildCount(); i++) {
            final DeviceButton childAt = (DeviceButton) getChildAt(i);
            if (!childAt.isEnabled()) {
                addView(item, i);
                removeViewAt(getChildCount() - 1);
                return true;
            }
        }
        return false;
    }


    public boolean isFull() {
        for (int i = 0; i < getChildCount(); i++)
            if (!getChildAt(i).isEnabled())
                return false;
        return true;
    }
}
