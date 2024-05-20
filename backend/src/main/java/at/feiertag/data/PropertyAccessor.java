package at.feiertag.data;

import at.feiertag.WebApplication;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertyAccessor {

    private static Properties properties;

    static {
        try (InputStream input = WebApplication.class.getClassLoader().getResourceAsStream("application.properties")) {
            properties = new Properties();

            // load a properties file
            properties.load(input);
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    public static String getProperty(String key) {
        return properties.getProperty(key);
    }
}
