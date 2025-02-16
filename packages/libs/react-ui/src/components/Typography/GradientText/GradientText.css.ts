import { atoms } from '@theme/atoms.css';
import { tokens } from '@theme/index';
import { style } from '@vanilla-extract/css';

export const gradientTextClass = style([
  atoms({
    fontWeight: 'bodyFont.bold',
  }),
  {
    backgroundColor: 'inherit',
    backgroundImage: `linear-gradient(50deg, ${tokens.kda.foundation.color.accent.brand.secondary}, ${tokens.kda.foundation.color.accent.brand.primary} 90%)`,
    backgroundSize: '100%',
    color: 'white',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
]);
