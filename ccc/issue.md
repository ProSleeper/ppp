# issue

## github action commit issue
```
Run git config --global user.email "github-actions[bot]@users.noreply.github.com"
  git config --global user.email "github-actions[bot]@users.noreply.github.com"
  git config --global user.name "GitHub Actions"
  git commit -m "update"
  shell: /usr/bin/bash -e {0}
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
Error: Process completed with exit code 1.
```

이런 오류가 나서 이것저것 찾아보니까 되게 단순한 오류다.
commit을 할게 없는데 계속 commit을 요청해서이다.
즉 변경점이 없는데 commit을 하려고 할때 나오는 오류이다.
