package ca.bertsa.domotique.models.devices;

public class Device {
    private String title;
    private String topic;
    private boolean status;
    private String channelId;
    private boolean toggleable;


    public Device() {
    }

    public String getTitle() {
        return title;
    }

    public String getTopic() {
        return topic;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getChannelId() {
        return channelId;
    }

    public boolean isToggleable() {
        return toggleable;
    }

    @Override
    public String toString() {
        return "Device{" +
                "title='" + title + '\'' +
                ", topic='" + topic + '\'' +
                ", status=" + status +
                ", channelId='" + channelId + '\'' +
                ", toggleable=" + toggleable +
                '}';
    }
}
