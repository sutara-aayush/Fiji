import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import ScoreScreen from '../ScoreScreen';


// storiesOf('ScoreScreen', module)
//   .add('with numbers', () => (
//     <ScoreScreen
//       currentScore={10}
//       user={{
//         "name": "Alice",
//         "_id": "alice",
//         "image": "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"
//       }}
//       item={{
//         "_id": "letters",
//         "name": "Letters"
//       }}
//       game={{
//         "_id": "game:memory-matching",
//         "name": "Memory Matching",
//         "screen": "Game1",
//         "category": "Read",
//         "sets": [
//           {
//             "_id": "letters",
//             "name": "Letters"
//           },
//           {
//             "_id": "numbers",
//             "name": "Numbers"
//           },
//           {
//             "_id": "images",
//             "name": "Images"
//           }
//         ]
//       }}
//     />
//   ));



