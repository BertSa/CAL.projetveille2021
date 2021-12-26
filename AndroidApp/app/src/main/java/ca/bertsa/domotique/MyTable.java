package ca.bertsa.domotique;

import android.content.Context;
import android.util.AttributeSet;
import android.view.View;
import android.widget.TableLayout;
import android.widget.TableRow;

import androidx.annotation.NonNull;
import androidx.appcompat.content.res.AppCompatResources;

public class MyTable extends TableLayout {

    public MyTable(Context context) {
        super(context);
    }

    public MyTable(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public void addItem(DeviceButton deviceButton) {
        boolean enabled;
        TableRow lastRow;
        if (getChildCount() > 0) {
            lastRow = (TableRow) getLastRow();
            DeviceButton childAt = (DeviceButton) lastRow.getChildAt(1);
            enabled = childAt.isEnabled();
            if (enabled) {
                TableRow tableRow = addRow();
                tableRow.addView(deviceButton, 0);
                tableRow.removeViewAt(1);
            } else {
                lastRow.addView(deviceButton);
                lastRow.removeViewAt(1);
            }
        } else {
            TableRow tableRow = addRow();
            tableRow.addView(deviceButton, 0);
        }

    }

    @NonNull
    private TableRow addRow() {
        TableRow tableRow = new TableRow(getContext());
        tableRow.setPadding(80, 0, 80, 0);
        tableRow.setLayoutParams(new TableRow.LayoutParams(TableRow.LayoutParams.MATCH_PARENT, TableRow.LayoutParams.WRAP_CONTENT));
        tableRow.setDividerDrawable(AppCompatResources.getDrawable(getContext(), R.drawable.empty_tall_divider));
        tableRow.setOrientation(TableRow.HORIZONTAL);
        tableRow.setShowDividers(TableRow.SHOW_DIVIDER_MIDDLE);
        tableRow.addView(new DeviceButton(getContext()));
        tableRow.addView(new DeviceButton(getContext()));
        addView(tableRow);
        return tableRow;
    }

    private View getLastRow() {
        return getChildAt(getChildCount() - 1);
    }

}