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
        if (getChildCount() > 0) {
            MyTableRow lastRow = getLastRow();
            if (!lastRow.addItem(deviceButton)) {
                TableRow tableRow = addRow();
                tableRow.addView(deviceButton, 0);
                tableRow.removeViewAt(1);
            }
        } else {
            MyTableRow tableRow = addRow();
            tableRow.addItem(deviceButton);
        }

    }

    @NonNull
    private MyTableRow addRow() {
        MyTableRow tableRow = new MyTableRow(getContext());
        addView(tableRow);
        return tableRow;
    }

    private MyTableRow getLastRow() {
        return (MyTableRow) getChildAt(getChildCount() - 1);
    }

}