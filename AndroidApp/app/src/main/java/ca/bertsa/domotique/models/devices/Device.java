package ca.bertsa.domotique.models.devices;

public class Device {
    private String title;
    private String topic;
    private boolean status;
    private String channelId;
    private String ref;
    private boolean toggleable;


    public Device() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
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

    public void setChannelId(String channelId) {
        this.channelId = channelId;
    }

    public String getRef() {
        return ref;
    }

    public void setRef(String ref) {
        this.ref = ref;
    }

    public boolean isToggleable() {
        return toggleable;
    }

    public void setToggleable(boolean toggleable) {
        this.toggleable = toggleable;
    }

    @Override
    public String toString() {
        return "Device{" +
                "title='" + title + '\'' +
                ", topic='" + topic + '\'' +
                ", status=" + status +
                ", channelId='" + channelId + '\'' +
                ", ref='" + ref + '\'' +
                ", toggleable=" + toggleable +
                '}';
    }
}
