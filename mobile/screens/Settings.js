// Import necessary modules
import React, { useState } from 'react';
import { LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Container } from '../components/Wrappers';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'intl-pluralrules';

// i18n
//   .use(initReactI18next)
//   .init({
//     lng: 'en', // Default language
//     resources: {
//       en: {
//         translation: {
//           changeLanguage: 'Change Language',
//           english: 'English',
//           hindi: 'Hindi',
//         },
//       },
//       hi: {
//         translation: {
//           changeLanguage: 'भाषा बदलें',
//           english: 'अंग्रेजी',
//           hindi: 'हिंदी',
//         },
//       },
//     },
//   });

// Language options
const languages = [
  { name: 'english', code: 'en' },
  { name: 'hindi', code: 'hi' },
];

// Component
const Settings = () => {
  const [showLanguagesList, setOpenLanguagesList] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Container>
      <TouchableOpacity
        onPress={() => {
          setOpenLanguagesList(!showLanguagesList);
          LayoutAnimation.configureNext(LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'));
        }}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{t('changeLanguage')}</Text>
        </View>
      </TouchableOpacity>
      {showLanguagesList && (
        <>
          {languages.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.button, { paddingHorizontal: 24 }]}
              onPress={() => changeLanguage(item.code)}>
              <Text style={styles.buttonText}>{t(item.name)}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </Container>
  );
};

export default Settings;

// Styles
const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#282534',
  },
});
