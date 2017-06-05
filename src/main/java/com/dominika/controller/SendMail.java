//package com.dominika.controller;
//
///**
// * Created by DiiES on 2017-06-05.
// */
//
//import org.hibernate.Session;
//
//import javax.mail.*;
//import javax.mail.internet.InternetAddress;
//import javax.mail.internet.MimeMessage;
//import java.net.PasswordAuthentication;
//import java.util.Date;
//import java.util.Properties;
//import java.util.Timer;
//import java.util.TimerTask;
//
//public class SendMail {
//
//
//
//
//    public class SendMailTSL extends TimerTask {
//
//        private final static long ONCE_PER_DAY = 1000 * 60 * 60 * 24;
//        //private final static int ONE_DAY = 1;
//        private final static int NINE_AM = 9;
//        private final static int ZERO_MINUTES = 0;
//        final String username = "";
//        final String password = "";
//
//        @Override
//        public void run() {
//            long currenntTime = System.currentTimeMillis();
//            long stopTime = currenntTime + 2000;//provide the 2hrs time it should execute 1000*60*60*2
//            while (stopTime != System.currentTimeMillis()) {
//                // Do your Job Here
//                System.out.println("Start Job" + stopTime);
//
//                Properties props = new Properties();
//                props.put("mail.smtp.auth", "true");
//                props.put("mail.smtp.starttls.enable", "true");
//                props.put("mail.smtp.host", "smtp.gmail.com");
//                props.put("mail.smtp.port", "587");
//
//                Session session = Session.getInstance(props,
//                        new javax.mail.Authenticator() {
//                            protected PasswordAuthentication getPasswordAuthentication() {
//                                return new PasswordAuthentication(username, password);
//                            }
//                        });
//                try {
//                    Message message = new MimeMessage(session);
//                    message.setFrom(new InternetAddress("kosiordawid@gmail.com"));
//                    message.setRecipients(Message.RecipientType.TO,
//                            InternetAddress.parse("));
//                    message.setSubject("Twój przeglad się kończy");
//                    message.setText("Twój przeglad sie kończy w tym tygodniu");
//                    Transport.send(message);
//                } catch (MessagingException e) {
//                    throw new RuntimeException(e);
//                }
//                break;
//            }
//            System.out.println("End Job" + System.currentTimeMillis());
//        }
//
//
//        private static Date getTomorrowMorning9AM() {
//            Date date9am = new java.util.Date();
//            date9am.setHours(NINE_AM);
//            date9am.setMinutes(ZERO_MINUTES);
//            return date9am;
//        }
//
//        //call this method from your servlet init method
//        public static void startTask() {
//            TimerTask task = new SendMailTSL();
//            Timer timer = new Timer();
//            timer.schedule(task, getTomorrowMorning9AM(), ONCE_PER_DAY);// for your case u need to give 1000*60*60*24
//        }
//
//        public static void main(String[] args) {
//            startTask();
//        }
//    }
//}
