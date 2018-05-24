import React from 'react'

// logo
// visibility
// visibilityOff
// exit
// home
// search
// refresh
// add
// back
// clear
// like
// comment
// delete
// image
// menu

export const Logo = props => (
  <svg height={100} viewBox="0 0 100 100" width={100} {...props}>
    <path d="M93.302 75.008C79.494 98.923 48.915 107.116 25 93.31 1.086 79.502-7.108 48.923 6.699 25.008 20.506 1.094 51.086-7.1 75 6.707c23.915 13.807 32.108 44.387 18.302 68.301z" fill="#4681A0" />
    <path d="M52.982 99.915V62.008l-6.008.075.007 37.832c2.006.12 4.009.121 6.001 0zm-3-84.907c4.123 0 17 21.432 17 38s-7.611 22-17 22-17-5.432-17-22 13.532-38 17-38z" fill="#EFC75E" />
    <path d="M49.982 35.008c2.425 0 10 15.011 10 24.4s-4.478 15.6-10 15.6-10-6.211-10-15.6 7.959-24.4 10-24.4z" fill="#EA9A57" />
    <path d="M46.982 72.008h6v12s-1.512-2-3.018-2c-1.494 0-2.982 2-2.982 2v-12z" fill="#41545F" />
    <path d="M50.094 56.016c3.315-.058 5.977 1.434 5.888 6.675s-2.896 12.248-6.21 12.305c-3.315.058-5.885-6.856-5.795-12.097.088-5.243 2.802-6.827 6.117-6.883z" fill="#2B414D" />
    <path d="M50.771 72.995c-3.315.058-5.885-6.856-5.795-12.097.019-1.133.167-2.086.411-2.898-.848 1.071-1.373 2.645-1.411 4.898-.09 5.24 2.479 12.154 5.795 12.097 1.81-.031 3.464-2.138 4.61-4.894-1.025 1.711-2.274 2.872-3.61 2.894z" fill="#273A45" />
  </svg>
)

export const VisibilityOff = props => (
  <svg height={24} viewBox="0 0 24 24" width={24} {...props}>
    <path
      d="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z"
      fill="none"
    />
    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
  </svg>
)

export const Visibility = props => (
  <svg height={24} viewBox="0 0 24 24" width={24} {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
)

export const Exit = props => (
  <svg height={24} viewBox="0 0 24 24" width={24} {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5a2 2 0 0 0-2 2v4h2V5h14v14H5v-4H3v4a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </svg>
)

export const Home = props => (
  <svg height={24} viewBox="0 0 24 24" width={24} {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)

export const Search = props => (
  <svg height={24} viewBox="0 0 24 24" width={24} {...props}>
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)

export const Refresh = props => (
  <svg height={24} viewBox="0 0 24 24" width={24} {...props}>
    <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)

export const Add = props => (
  <svg height={24} viewBox="0 0 24 24" width={24} {...props}>
    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)

export const Back = props => (
  <svg height={24} viewBox="0 0 24 24" width={24} {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </svg>
)

export const Clear = props => (
  <svg height={24} viewBox="0 0 24 24" width={24} {...props}>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)

export const Like = props => (
  <svg height={24} viewBox="0 0 24 24" width={24} {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
  </svg>
)

export const Comment = props => (
  <svg height={24} viewBox="0 0 24 24" width={24} {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" />
  </svg>
)

export const Delete = props => (
  <svg height={24} viewBox="0 0 24 24" width={24} {...props}>
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)

export const Update = props => (
  <svg height={24} viewBox="0 0 24 24" width={24} {...props}>
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)

export const Image = props => (
  <svg height={24} viewBox="0 0 24 24" width={24} {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
  </svg>
)

export const Menu = props => (
  <svg height={24} viewBox="0 0 24 24" width={24} {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
)
