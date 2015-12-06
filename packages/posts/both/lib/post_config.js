/*
** Data type
type1 answer is one string/number
{item:'Height', value: 170},

type2 answers are muitiple string/number ex. for seaching range
      answer's value is array
{item:'Age', value: [10,50]},

type3 one answer is chose from options
{item:"Gender", value: 'female', selections: ['male', 'female', 'other']},

type4 muitiple answers are chose from options. 
      answer's  value is array
{item:'Speak', value: ['中文'], selections: ['中文', 'English', 'Spanish', 'Fanch', '--']},
*/
  MS.Posts.Objects.defaultLookingfor = [
          {item:'Looking for', value: 'male'},
          {item:'Age', value: [18, 30]},
          {item:'For', value: 'long-term dating'},
          {item:'Ethnic', value: '--'}
          ];
MS.Posts.Objects.lookingforMeta = [
          {item:'Looking for', selections: ['male', 'female', 'other']},
          {item:'Age', range:[10, 100]},
          {item:'For', selections: ['new friends', 'long-term dating', 'short-term dating']},
          {item:'Ethnic', selections: ['Asian', 'White', 'black', '--']}
          ];
  MS.Posts.Objects.defaultMyInfo = [
        {item:"Gender", value: 'female'},
        {item:'Orientation', value: '--'},
        {item:'For', value: ['long-term dating']},
        {item:'Height', value: 170},
        {item:'Age', value: 23},
        {item:'Body Type', value: '--'},
        {item:'Education', value: 'college'},
        {item:'Religion', value: '--'},
        {item:'Speak', value: ['中文']},
        {item:'Ethnic', value: ['--']},
        {item:'Salary', value: ''}
        ];
  MS.Posts.Objects.myInfoMeta = [
        {item:"Gender", selections: ['male', 'female', 'other', '--'], view:'physical'},
        {item:'Orientation', selections: ['Straight', '--'], view:'physical'},
        {item:'For', selections: ['new friends', 'long-term dating', 'short-term dating', '--'], view:'physical'},
        {item:'Height', view:'physical', range:[50, 250]},
        {item:'Age', view:'physical', range:[10, 100]},
        {item:'Body Type', selections: ['skinny', 'normal', '肉肉', '--'], view:'physical'},
        {item:'Education', selections: ['college', 'high school', '--'], view:'inner'},
        {item:'Religion', selections: ['Buddhism', 'Christian', 'Catholicism', 'Islam', '--'], view:'inner'},
        {item:'Speak', selections: ['中文', 'English', 'Spanish', 'Fanch', '--'], view:'inner'},
        {item:'Ethnic', selections: ['Asian', 'White', 'black', '--'], view:'physical'},
        {item:'Salary', view:'inner', range:[0, 10000]}
  ]

  MS.Posts.Objects.defaultSearchConfig = [
        {item:"Gender", value: 'female'},
        {item:'Orientation', value: '--'},
        {item:'For', value: ['long-term dating']},
        {item:'Height', value: [100, 200]},
        {item:'Age', value: [10,50]},
        {item:'Body Type', value: '--'},
        {item:'Education', value: 'college'},
        {item:'Religion', value: '--'},
        {item:'Speak', value: ['中文']},
        {item:'Ethnic', value: ['--']},
        {item:'Salary', value: [-1,-1]}
        ];
MS.Posts.Objects.searchConfigMeta = [
        {item:"Gender", selections: ['male', 'female', 'other', '--'], view:'physical'},
        {item:'Orientation', selections: ['Straight', '--'], view:'physical'},
        {item:'For', selections: ['new friends', 'long-term dating', 'short-term dating', '--'], view:'physical'},
        {item:'Height', view:'physical', range:[50, 250]},
        {item:'Age', view:'physical', range:[10, 100]},
        {item:'Body Type', selections: ['skinny', 'normal', '肉肉', '--'], view:'physical'},
        {item:'Education', selections: ['college', 'high school', '--'], view:'inner'},
        {item:'Religion', selections: ['佛教', '天主教', '--'], view:'inner'},
        {item:'Speak', selections: ['中文', 'English', 'Spanish', 'Fanch', '--'], view:'inner'},
        {item:'Ethnic', selections: ['Asian', 'White', 'black', '--'], view:'physical'},
        {item:'Salary', view:'inner', range:[0, 10000]}
        ];