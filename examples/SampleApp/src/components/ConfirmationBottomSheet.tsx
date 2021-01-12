import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Delete, UserMinus, useTheme } from 'stream-chat-react-native/v2';

import { useAppOverlayContext } from '../context/AppOverlayContext';
import {
  isAddMemberBottomSheetData,
  useBottomSheetOverlayContext,
} from '../context/BottomSheetOverlayContext';

const styles = StyleSheet.create({
  actionButtonLeft: {
    flex: 1,
    padding: 20,
  },
  actionButtonRight: {
    alignItems: 'flex-end',
    flex: 1,
    padding: 20,
  },
  actionButtonsContainer: {
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  container: {
    height: 224,
  },
  description: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  subtext: {
    marginTop: 8,
  },
  title: {
    fontWeight: '600',
    marginTop: 18,
  },
});

export const ConfirmationBottomSheet: React.FC = () => {
  const { setOverlay } = useAppOverlayContext();
  const { data: contextData, reset } = useBottomSheetOverlayContext();
  const data =
    contextData && !isAddMemberBottomSheetData(contextData)
      ? contextData
      : undefined;

  const {
    theme: {
      colors: { accent_red, black, border, grey, white },
    },
  } = useTheme();
  const inset = useSafeAreaInsets();

  if (!data) {
    return null;
  }

  const {
    cancelText = 'CANCEL',
    confirmText = 'CONFIRM',
    onConfirm,
    subtext,
    title,
  } = data;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: white,
          marginBottom: inset.bottom,
        },
      ]}
    >
      <View style={styles.description}>
        {confirmText === 'LEAVE' ? (
          <UserMinus pathFill={grey} />
        ) : (
          <Delete pathFill={accent_red} />
        )}
        <Text style={[styles.title, { color: black }]}>{title}</Text>
        <Text style={[styles.subtext, { color: black }]}>{subtext}</Text>
      </View>
      <View
        style={[
          styles.actionButtonsContainer,
          {
            borderTopColor: border,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            setOverlay('none');
            reset();
          }}
          style={styles.actionButtonLeft}
        >
          <Text style={{ color: grey }}>{cancelText}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onConfirm} style={styles.actionButtonRight}>
          <Text style={{ color: accent_red }}>{confirmText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
