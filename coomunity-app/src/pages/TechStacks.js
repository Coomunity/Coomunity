// 작성 양식
// <img src="https://img.shields.io/badge/표시할이름-색상?style=for-the-badge&logo=기술스택아이콘&logoColor=white">
const techStacks = [
  { name: 'Python', imageUrl: 'https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white'},
  { name: 'C', imageUrl: 'https://img.shields.io/badge/c-A8B9CC?style=for-the-badge&logo=c&logoColor=white'},
  { name: 'C#', imageUrl: 'https://img.shields.io/badge/c%23-512BD4?style=for-the-badge&logo=c%23&logoColor=white'},
  { name: 'C++', imageUrl: 'https://img.shields.io/badge/c%2B%2B-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white'},
  { name: 'Java', imageUrl: 'https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white'},    // java 로고가 없음
  { name: 'Rust', imageUrl: 'https://img.shields.io/badge/rust-000000?style=for-the-badge&logo=rust&logoColor=white'},
  { name: 'Go', imageUrl: 'https://img.shields.io/badge/go-00ADD8?style=for-the-badge&logo=go&logoColor=white'},
  { name: 'Haskell', imageUrl: 'https://img.shields.io/badge/Haskell-5D4F85?style=for-the-badge&logo=Haskell&logoColor=white'},
  { name: 'Scala', imageUrl: 'https://img.shields.io/badge/Scala-DC322F?style=for-the-badge&logo=Scala&logoColor=white'},
  { name: 'Perl', imageUrl: 'https://img.shields.io/badge/Perl-39457E?style=for-the-badge&logo=Perl&logoColor=white'},
  { name: 'Lua', imageUrl: 'https://img.shields.io/badge/Lua-2C2D72?style=for-the-badge&logo=Lua&logoColor=white'},
  { name: 'R', imageUrl: 'https://img.shields.io/badge/R-276DC3?style=for-the-badge&logo=R&logoColor=white'},
  { name: 'Elixir', imageUrl: 'https://img.shields.io/badge/Elixir-4B275F?style=for-the-badge&logo=Elixir&logoColor=white'},
  { name: 'Julia', imageUrl: 'https://img.shields.io/badge/Julia-9558B2?style=for-the-badge&logo=Julia&logoColor=white'},
  { name: 'VisualBasic', imageUrl: 'https://img.shields.io/badge/visualbasic-512BD4?style=for-the-badge&logo=visualbasic&logoColor=white'},
  { name: 'Fortran', imageUrl: 'https://img.shields.io/badge/fortran-734F96?style=for-the-badge&logo=fortran&logoColor=white'},
  { name: 'Erlang', imageUrl: 'https://img.shields.io/badge/erlang-A90533?style=for-the-badge&logo=erlang&logoColor=white'},
  { name: 'Clojure', imageUrl: 'https://img.shields.io/badge/clojure-5881D8?style=for-the-badge&logo=clojure&logoColor=white'},
  { name: 'D', imageUrl: 'https://img.shields.io/badge/d-B03931?style=for-the-badge&logo=d&logoColor=white'},
  // 프론트
  { name: 'HTML5', imageUrl: 'https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white' },
  { name: 'CSS', imageUrl: 'https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white'},
  { name: 'Javascript', imageUrl: 'https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black'},
  { name: 'React', imageUrl: 'https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white'},
  { name: 'Vue.js', imageUrl: 'https://img.shields.io/badge/vuedotjs-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white'},
  { name: 'flutter', imageUrl: 'https://img.shields.io/badge/flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white'},
  { name: 'Kotlin', imageUrl: 'https://img.shields.io/badge/kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white'},
  { name: 'Swift', imageUrl: 'https://img.shields.io/badge/swift-F05138?style=for-the-badge&logo=swift&logoColor=white'},
  { name: 'TypeScript', imageUrl: 'https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white'},
  { name: 'Dart', imageUrl: 'https://img.shields.io/badge/Dart-0175C2?style=for-the-badge&logo=Dart&logoColor=white'},
  // 백
  { name: 'Spring', imageUrl: 'https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white'},
  { name: 'Flask', imageUrl: 'https://img.shields.io/badge/flask-000000?style=for-the-badge&logo=flask&logoColor=white'},
  { name: 'Ruby', imageUrl: 'https://img.shields.io/badge/ruby-CC342D?style=for-the-badge&logo=ruby&logoColor=white'},
  { name: 'PHP', imageUrl: 'https://img.shields.io/badge/php-777BB4?style=for-the-badge&logo=php&logoColor=white'},
  { name: 'Linux', imageUrl: 'https://img.shields.io/badge/linux-FCC624?style=for-the-badge&logo=linux&logoColor=black'},
  { name: 'Django', imageUrl: 'https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django&logoColor=white'},
  { name: 'AWSLambda', imageUrl: 'https://img.shields.io/badge/Lambda-FF9900?style=for-the-badge&logo=awsLambda&logoColor=white'},
  { name: 'AmazonAWS', imageUrl: 'https://img.shields.io/badge/aws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white'},
  { name: 'AmazonEC2', imageUrl: 'https://img.shields.io/badge/ec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white'},
  { name: 'CoffeeScript', imageUrl: 'https://img.shields.io/badge/coffeescript-2F2625?style=for-the-badge&logo=coffeescript&logoColor=white'},
  { name: 'Crystal', imageUrl: 'https://img.shields.io/badge/crystal-000000?style=for-the-badge&logo=crystal&logoColor=white'},
  // db
  { name: 'MYSQL', imageUrl: 'https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white'},
  { name: 'MongoDB', imageUrl: 'https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white'},
  { name: 'MariaDB', imageUrl: 'https://img.shields.io/badge/mariadb-003545?style=for-the-badge&logo=mariadb&logoColor=white'},
  { name: 'PostgreSQL', imageUrl: 'https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white'},
  { name: 'SQLite', imageUrl: 'https://img.shields.io/badge/sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white'},
  { name: 'AmazonRDS', imageUrl: 'https://img.shields.io/badge/amazonrds-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white'},
  { name: 'AmazonDynamoDB', imageUrl: 'https://img.shields.io/badge/dynamodb-4053D6?style=for-the-badge&logo=amazondynamodb&logoColor=white'},
  
  // 기타
  { name: 'Firebase', imageUrl: 'https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black'},
  { name: 'figma', imageUrl: 'https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white'},
  { name: 'github', imageUrl: 'https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white'},
];

export default techStacks;