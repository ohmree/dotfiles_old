" vim:ft=vim
set background=dark
set clipboard+=unnamedplus
set smartcase
set tabstop=8
set softtabstop=4
set shiftwidth=4

"let g:base16colorspace=256
"let g:theme_name = 'base16-google'
"let g:theme_name = 'base16-default'
"let g:airline_theme = 'base16'
let g:deoplete#enable_at_startup = 1
"let g:rainbow_active = 1

"dein Scripts-----------------------------
if &compatible
  set nocompatible               " Be iMproved
endif

" Required:
set runtimepath+=/home/omri/.config/nvim/repos/github.com/Shougo/dein.vim

" Required:
call dein#begin('/home/omri/.config/nvim')

" Let dein manage dein
" Required:
call dein#add('Shougo/dein.vim')

" Add or remove your plugins here:
call dein#add('Shougo/neosnippet.vim')
call dein#add('Shougo/neosnippet-snippets')
call dein#add('haya14busa/dein-command.vim')
call dein#add('gorodinskiy/vim-coloresque')
call dein#add('Shougo/vimshell')
call dein#add('Shougo/deoplete.nvim')
call dein#add('Shougo/denite.nvim')
call dein#add('dracula/vim')

" Required:
call dein#end()

" Required:
filetype plugin indent on
syntax enable

" If you want to install not installed plugins on startup.
if dein#check_install()
  call dein#install()
endif

"End dein Scripts-------------------------
"color dracula
