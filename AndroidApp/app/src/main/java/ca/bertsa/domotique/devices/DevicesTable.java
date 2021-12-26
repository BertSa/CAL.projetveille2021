package ca.bertsa.domotique.devices;

import android.content.Context;
import android.util.AttributeSet;
import android.widget.TableLayout;

import androidx.annotation.NonNull;

public class DevicesTable extends TableLayout {

    public DevicesTable(Context context) {
        super(context);
    }

    public DevicesTable(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public void addItem(DeviceButton deviceButton) {
        if (getChildCount() > 0) {
            DevicesTableRow lastRow = getLastRow();
            if (!lastRow.addItem(deviceButton)) {
                DevicesTableRow tableRow = addRow();
                tableRow.addItem(deviceButton);
            }
        } else {
            DevicesTableRow tableRow = addRow();
            tableRow.addItem(deviceButton);
        }

    }

    @NonNull
    private DevicesTableRow addRow() {
        DevicesTableRow tableRow = new DevicesTableRow(getContext());
        addView(tableRow);
        return tableRow;
    }

    private DevicesTableRow getLastRow() {
        return (DevicesTableRow) getChildAt(getChildCount() - 1);
    }

}