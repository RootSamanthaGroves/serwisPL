package com.dominika.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.Map;
import java.util.Properties;

@Service
public class MailClient {

    @Value("${spring.mail.username}")
    private String FROM;
    private JavaMailSender mailSender;

    @Autowired
    public MailClient(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public boolean prepareAndSend(String[] recipient, String subject, String message, Map<String, byte[]> attachments) throws UnsupportedEncodingException, MessagingException {
      /*  MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
            messageHelper.setFrom(FROM);
            messageHelper.setTo(recipient);
            messageHelper.setSubject(subject);*/
//            System.out.println(subject + " \n" + message + "\n" + recipient[0]);
           /* messageHelper.setText(message);*/
//            if(!attachments.isEmpty()){
//                for (Map.Entry<String, byte[]> entry : attachments.entrySet()) {
//                    messageHelper.addAttachment(entry.getKey(),new ByteArrayResource(entry.getValue()));
//                }
//            }


        Properties propsSSL = new Properties();

        // EVEN IF YOU SKIP THESE TWO PROP IT WOULD WORK
        propsSSL.put("mail.transport.protocol", "smtps");
        propsSSL.put("mail.smtps.host", "smtp.gmail.com");

        // THIS IS THE MOST IMPORTANT PROP --> "mail.smtps.auth"
        propsSSL.put("mail.smtps.auth", "true");

        Session sessionSSL = Session.getInstance(propsSSL);
        sessionSSL.setDebug(true);

        Message messageSSL = new MimeMessage(sessionSSL);
        messageSSL.setFrom(new InternetAddress("garazplpl@gmail.com", "GarazPL"));
        messageSSL.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipient[0])); // real recipient
        messageSSL.setSubject(subject);
        messageSSL.setText(message);

        Transport transportSSL = sessionSSL.getTransport();
        // EVEN IF YOU SKIP PORT NUMBER , IT WOULD WORK
        transportSSL.connect("smtp.gmail.com", 465, "garazplpl@gmail.com", "zaq1@WSX"); // account used
        transportSSL.sendMessage(messageSSL, messageSSL.getAllRecipients());
        transportSSL.close();

        System.out.println("SSL done.");

        return false;
    }

    ;
        /*try {
            mailSender.send(messagePreparator);
            return true;
        } catch (MailException e) {
            e.printStackTrace();
            return false;
        }*/
    //  }
}
