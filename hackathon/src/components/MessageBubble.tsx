import { StyleSheet, Text, View } from 'react-native';
import { Id } from '@/convex/_generated/dataModel';

type Message = {
  _id: Id<'messages'>;
  matchId: Id<'matches'>;
  senderId: Id<'profiles'>;
  content: string;
};

export function MessageBubble({ message, mine }: { message: Message; mine: boolean }) {
  return (
    <View style={[styles.wrapper, mine ? styles.mineWrapper : styles.theirWrapper]}>
      <View style={[styles.bubble, mine ? styles.mineBubble : styles.theirBubble]}>
        <Text style={mine ? styles.mineText : styles.theirText}>{message.content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  mineWrapper: {
    justifyContent: 'flex-end',
  },
  theirWrapper: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  mineBubble: {
    backgroundColor: '#112018',
  },
  theirBubble: {
    backgroundColor: '#eaf0ea',
  },
  mineText: {
    color: '#fff',
  },
  theirText: {
    color: '#13241a',
  },
});
