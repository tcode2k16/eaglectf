number = 59
flag = 'flag{one_two_three_four}'
for i in range(1, 100+1):
  with open('../txt/{}.txt'.format(i), 'w') as f:
    if i == number:
      f.write('Here\'s your flag: {}'.format(flag))
    else:
      f.write('Not this one. Try Harder.')