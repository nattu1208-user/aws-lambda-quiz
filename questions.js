/**
 * AWS Lambda 特化クイズ — 問題データ
 *
 * 目的: Lambda の知識を多角的に問い、繰り返し解くことで理解を深める
 * 対象: SAA レベル
 *
 * 作成者: Sekimoto Naoto
 * 作成日: 2026-04-21
 */

const QUESTIONS = [
  // ============================================================
  // カテゴリ1: Lambda 基礎知識（10問）
  // ============================================================
  {
    id: 'lambda-01',
    category: 'Lambda 基礎知識',
    question: 'AWS Lambda 関数の最大実行時間（タイムアウト）はどれか。',
    choices: [
      { id: 'A', text: '5分（300秒）' },
      { id: 'B', text: '10分（600秒）' },
      { id: 'C', text: '15分（900秒）' },
      { id: 'D', text: '30分（1,800秒）' }
    ],
    correct: 'C',
    explanation: 'Lambda 関数の最大タイムアウトは 900秒（15分）です。これを超える処理は Lambda 単体では実行できません。',
    point: '🔑 ポイント: Lambda のタイムアウト上限は900秒（15分）。これを超える場合は Step Functions で分割するか、ECS/Fargate を検討する。',
    why_not: {
      'A': '5分（300秒）はかつての上限値。2018年に15分に引き上げられた。',
      'B': '10分（600秒）という上限は存在しない。',
      'D': '30分（1,800秒）は Lambda の上限を超えている。'
    }
  },
  {
    id: 'lambda-02',
    category: 'Lambda 基礎知識',
    question: 'Lambda 関数に割り当て可能なメモリの範囲として正しいものはどれか。',
    choices: [
      { id: 'A', text: '64MB 〜 3,008MB' },
      { id: 'B', text: '128MB 〜 10,240MB' },
      { id: 'C', text: '256MB 〜 8,192MB' },
      { id: 'D', text: '128MB 〜 3,008MB' }
    ],
    correct: 'B',
    explanation: 'Lambda のメモリは 128MB から 10,240MB（10GB）まで、1MB 刻みで設定できます。',
    point: '🔑 ポイント: メモリ範囲は 128MB〜10,240MB。メモリを増やすと CPU パワーも比例して増加する（直接 CPU を指定することはできない）。',
    why_not: {
      'A': '64MB は最小値として小さすぎる。また 3,008MB は以前の上限値。',
      'C': '256MB〜8,192MB は正しくない。最小は 128MB、最大は 10,240MB。',
      'D': '128MB は正しいが、3,008MB は以前の上限。現在は 10,240MB まで設定可能。'
    }
  },
  {
    id: 'lambda-03',
    category: 'Lambda 基礎知識',
    question: 'Lambda のデプロイパッケージサイズの上限として正しい組み合わせはどれか。',
    choices: [
      { id: 'A', text: 'ZIP: 50MB、展開後: 250MB' },
      { id: 'B', text: 'ZIP: 100MB、展開後: 500MB' },
      { id: 'C', text: 'ZIP: 50MB、展開後: 500MB' },
      { id: 'D', text: 'ZIP: 250MB、展開後: 1GB' }
    ],
    correct: 'A',
    explanation: 'Lambda のデプロイパッケージは ZIP アップロード時 50MB、展開後 250MB が上限です。コンテナイメージを使う場合は最大 10GB まで対応できます。',
    point: '🔑 ポイント: ZIP=50MB / 展開後=250MB。超える場合はコンテナイメージ（最大10GB）を使う。Lambda Layers も合算してこの制限に含まれる。',
    why_not: {
      'B': '100MB / 500MB は正しくない。ZIP は 50MB が上限。',
      'C': 'ZIP 50MB は正しいが、展開後は 250MB が正解（500MB ではない）。',
      'D': '250MB / 1GB は正しくない。これはコンテナイメージとも異なる。'
    }
  },
  {
    id: 'lambda-04',
    category: 'Lambda 基礎知識',
    question: 'Lambda の一時ストレージ（/tmp）について正しい説明はどれか。',
    choices: [
      { id: 'A', text: 'デフォルト 512MB で変更不可' },
      { id: 'B', text: 'デフォルト 512MB で最大 10,240MB まで拡張可能' },
      { id: 'C', text: 'デフォルト 1GB で最大 10,240MB まで拡張可能' },
      { id: 'D', text: '/tmp は提供されておらず、S3 を代替として使う必要がある' }
    ],
    correct: 'B',
    explanation: '/tmp は デフォルト 512MB で、設定により最大 10,240MB（10GB）まで拡張できます。関数の実行中にのみ利用可能な一時領域です。',
    point: '🔑 ポイント: /tmp はデフォルト 512MB、最大 10,240MB。同じ実行環境が再利用される場合、前回のデータが残っている可能性がある。',
    why_not: {
      'A': '以前は 512MB 固定だったが、現在は最大 10,240MB まで拡張できる。',
      'C': 'デフォルトは 1GB ではなく 512MB。',
      'D': '/tmp は Lambda に標準で提供される一時ストレージ。'
    }
  },
  {
    id: 'lambda-05',
    category: 'Lambda 基礎知識',
    question: 'Lambda のリージョンあたりのデフォルト同時実行数の上限はどれか。',
    choices: [
      { id: 'A', text: '500' },
      { id: 'B', text: '1,000' },
      { id: 'C', text: '3,000' },
      { id: 'D', text: '10,000' }
    ],
    correct: 'B',
    explanation: 'Lambda のデフォルト同時実行数はリージョンあたり 1,000 です。Service Quotas から引き上げをリクエストできます。',
    point: '🔑 ポイント: デフォルト同時実行数は 1,000/リージョン。全関数で共有される。Reserved Concurrency で関数ごとに確保も可能。',
    why_not: {
      'A': '500 は正しくない。デフォルトは 1,000。',
      'C': '3,000 は一部の特定リージョン（us-east-1 等）の初期バースト上限であり、同時実行数のデフォルト上限ではない。',
      'D': '10,000 は引き上げ後の値としてはあり得るが、デフォルトではない。'
    }
  },
  {
    id: 'lambda-06',
    category: 'Lambda 基礎知識',
    question: 'Lambda 関数の環境変数について正しいものはどれか。',
    choices: [
      { id: 'A', text: '環境変数の合計サイズは最大 4KB まで' },
      { id: 'B', text: '環境変数は暗号化されずプレーンテキストで保存される' },
      { id: 'C', text: '環境変数は KMS で暗号化され、実行時に復号される' },
      { id: 'D', text: '環境変数は関数あたり最大10個まで設定できる' }
    ],
    correct: 'C',
    explanation: 'Lambda の環境変数は AWS KMS を使って暗号化されます。デフォルトでは Lambda サービスキーで暗号化され、カスタム KMS キーも指定可能です。',
    point: '🔑 ポイント: 環境変数は KMS で暗号化（保存時）。合計サイズ上限は 4KB。機密情報は AWS Secrets Manager や Parameter Store の利用も検討する。',
    why_not: {
      'A': '合計サイズ 4KB は正しいが、この選択肢は「暗号化」に触れていない点で不完全。設問の趣旨である「正しい説明」には C がより適切。',
      'B': '環境変数はプレーンテキストではなく KMS で暗号化される。',
      'D': '環境変数の個数制限は10個ではなく、合計サイズ 4KB が制限。'
    }
  },
  {
    id: 'lambda-07',
    category: 'Lambda 基礎知識',
    question: 'Lambda Layers について正しいものはどれか。',
    choices: [
      { id: 'A', text: '1つの関数に最大 10 個の Layer をアタッチできる' },
      { id: 'B', text: '1つの関数に最大 5 個の Layer をアタッチできる' },
      { id: 'C', text: 'Layer はリージョンをまたいで共有できる' },
      { id: 'D', text: 'Layer を使うとデプロイパッケージのサイズ制限が緩和される' }
    ],
    correct: 'B',
    explanation: '1つの Lambda 関数にアタッチできる Layer は最大 5 個です。Layer は共通ライブラリやランタイム依存関係を共有するのに便利です。',
    point: '🔑 ポイント: Layer は最大 5 個/関数。Layer のサイズも含めて展開後 250MB の制限に合算される。同一リージョン内で複数関数から共有可能。',
    why_not: {
      'A': '最大 10 個ではなく 5 個。',
      'C': 'Layer はリージョン単位のリソースであり、他リージョンからは直接参照できない。',
      'D': 'Layer を使ってもデプロイパッケージの 250MB 制限は緩和されない。Layer も含めて 250MB に合算される。'
    }
  },
  {
    id: 'lambda-08',
    category: 'Lambda 基礎知識',
    question: 'Lambda の実行ロール（Execution Role）について正しいものはどれか。',
    choices: [
      { id: 'A', text: '実行ロールは省略可能で、Lambda にはデフォルトで全 AWS サービスへのアクセス権がある' },
      { id: 'B', text: '実行ロールは Lambda が他の AWS サービスにアクセスするための IAM ロールで、関数に必ず1つ割り当てる' },
      { id: 'C', text: '実行ロールは呼び出し元のユーザーの IAM 権限をそのまま引き継ぐ' },
      { id: 'D', text: '実行ロールは CloudWatch Logs への書き込み権限のみを持つ特殊なロール' }
    ],
    correct: 'B',
    explanation: '実行ロール（Execution Role）は Lambda が他の AWS サービスへアクセスするための IAM ロールです。関数には必ず1つの実行ロールを割り当てる必要があります。',
    point: '🔑 ポイント: 実行ロールは必須。最小権限の原則に従い、関数が必要とする権限のみを付与する。AWSLambdaBasicExecutionRole は CloudWatch Logs 書き込み権限を含む基本ポリシー。',
    why_not: {
      'A': '実行ロールは必須であり、デフォルトで全サービスアクセスは付与されない。',
      'C': 'Lambda は呼び出し元の権限ではなく、自身の実行ロールの権限で動作する。',
      'D': 'CloudWatch Logs 権限は基本ポリシーの一部だが、実行ロール自体はそれ以外の権限も付与できる。'
    }
  },
  {
    id: 'lambda-09',
    category: 'Lambda 基礎知識',
    question: 'Lambda 関数のバージョンとエイリアスについて正しいものはどれか。',
    choices: [
      { id: 'A', text: 'バージョンは変更可能なスナップショットで、後からコードを更新できる' },
      { id: 'B', text: 'エイリアスは特定のバージョンを指すポインタで、重み付けルーティングが可能' },
      { id: 'C', text: 'エイリアスは1つのバージョンのみを指し、複数バージョンへの振り分けはできない' },
      { id: 'D', text: '$LATEST は公開済みバージョンの一つであり、変更不可能である' }
    ],
    correct: 'B',
    explanation: 'エイリアスは特定のバージョンを指すポインタです。2つのバージョン間で重み付けルーティングが可能で、カナリアデプロイやブルー/グリーンデプロイに活用できます。',
    point: '🔑 ポイント: エイリアスは2バージョン間の重み付けルーティングが可能（例: prod エイリアスを v1:90%, v2:10%）。これによりカナリアデプロイを実現できる。',
    why_not: {
      'A': '公開済みバージョンは不変（immutable）であり、コードや設定は変更できない。',
      'C': 'エイリアスは2つのバージョン間で重み付けルーティングが可能。',
      'D': '$LATEST は公開済みバージョンではなく、変更可能な最新のコード。'
    }
  },
  {
    id: 'lambda-10',
    category: 'Lambda 基礎知識',
    question: 'Lambda Function URL について正しいものはどれか。',
    choices: [
      { id: 'A', text: 'Function URL を使うには API Gateway の設定が必須である' },
      { id: 'B', text: 'Function URL は HTTP(S) エンドポイントを Lambda に直接割り当てる機能で、API Gateway は不要' },
      { id: 'C', text: 'Function URL はカスタムドメインをデフォルトでサポートする' },
      { id: 'D', text: 'Function URL は VPC 内からのみアクセス可能' }
    ],
    correct: 'B',
    explanation: 'Lambda Function URL は API Gateway なしで Lambda 関数に専用の HTTPS エンドポイントを付与する機能です。追加料金なしで利用できます。',
    point: '🔑 ポイント: Function URL は API Gateway 不要で HTTPS エンドポイントを付与。認証は IAM または NONE（パブリック）。シンプルな API や Webhook に最適。',
    why_not: {
      'A': 'Function URL の目的は API Gateway なしでエンドポイントを提供すること。',
      'C': 'Function URL はカスタムドメインを直接サポートしない。カスタムドメインが必要なら CloudFront 等を前段に置く。',
      'D': 'Function URL はインターネットからアクセス可能。VPC 限定ではない。'
    }
  },

  // ============================================================
  // カテゴリ2: Lambda 設計パターン（10問）
  // ============================================================
  {
    id: 'lambda-11',
    category: 'Lambda 設計パターン',
    question: 'Lambda の同期呼び出し（Synchronous Invocation）について正しいものはどれか。',
    choices: [
      { id: 'A', text: '同期呼び出しでは Lambda がエラーを返した場合、自動的に2回リトライされる' },
      { id: 'B', text: '同期呼び出しでは呼び出し元がレスポンスを待ち、エラー時のリトライは呼び出し元の責任' },
      { id: 'C', text: '同期呼び出しでは DLQ（Dead Letter Queue）に失敗イベントが自動送信される' },
      { id: 'D', text: 'API Gateway からの呼び出しは非同期呼び出しである' }
    ],
    correct: 'B',
    explanation: '同期呼び出しでは、呼び出し元が Lambda の実行完了を待ちます。エラー時に自動リトライは行われず、リトライは呼び出し元が制御します。',
    point: '🔑 ポイント: 同期呼び出し = 呼び出し元がレスポンスを待つ。リトライは呼び出し元の責任。API Gateway、ALB、CloudFront (Lambda@Edge) は同期呼び出し。',
    why_not: {
      'A': '自動2回リトライは非同期呼び出しの動作。同期呼び出しではリトライなし。',
      'C': 'DLQ は非同期呼び出し用の機能。同期呼び出しでは DLQ は使えない。',
      'D': 'API Gateway からの呼び出しは同期呼び出し。'
    }
  },
  {
    id: 'lambda-12',
    category: 'Lambda 設計パターン',
    question: 'Lambda の非同期呼び出し（Asynchronous Invocation）でエラーが発生した場合、デフォルトのリトライ回数は何回か。',
    choices: [
      { id: 'A', text: '0回（リトライなし）' },
      { id: 'B', text: '1回' },
      { id: 'C', text: '2回' },
      { id: 'D', text: '3回' }
    ],
    correct: 'C',
    explanation: '非同期呼び出しでエラーが発生すると、Lambda は自動的に最大2回リトライします（合計3回実行）。リトライ回数は0〜2回で設定変更可能です。',
    point: '🔑 ポイント: 非同期呼び出しのリトライは最大2回（設定変更可能: 0〜2）。リトライ間には遅延がある。S3、SNS、EventBridge は非同期呼び出し。',
    why_not: {
      'A': 'デフォルトではリトライが行われる。0回に設定変更は可能。',
      'B': '1回ではなく2回がデフォルト。',
      'D': '最大2回であり、3回ではない。'
    }
  },
  {
    id: 'lambda-13',
    category: 'Lambda 設計パターン',
    question: 'Lambda のイベントソースマッピング（Event Source Mapping）を使用するサービスはどれか。',
    choices: [
      { id: 'A', text: 'S3' },
      { id: 'B', text: 'SNS' },
      { id: 'C', text: 'SQS' },
      { id: 'D', text: 'API Gateway' }
    ],
    correct: 'C',
    explanation: 'SQS はイベントソースマッピングを使って Lambda と連携します。Lambda がキューをポーリングしてメッセージを取得する方式です。',
    point: '🔑 ポイント: イベントソースマッピングは「Lambda がポーリング」する方式。SQS、DynamoDB Streams、Kinesis Data Streams、Apache Kafka が該当。S3 や SNS は Lambda をプッシュ呼び出しする。',
    why_not: {
      'A': 'S3 はイベント通知で Lambda を非同期に呼び出す（プッシュ型）。イベントソースマッピングではない。',
      'B': 'SNS は Lambda をプッシュで呼び出す。イベントソースマッピングではない。',
      'D': 'API Gateway は Lambda を同期で呼び出す。イベントソースマッピングではない。'
    }
  },
  {
    id: 'lambda-14',
    category: 'Lambda 設計パターン',
    question: 'Lambda Destinations について正しいものはどれか。',
    choices: [
      { id: 'A', text: '同期呼び出しの成功・失敗時にのみ設定できる' },
      { id: 'B', text: '非同期呼び出しの成功時と失敗時それぞれに異なる送信先を設定できる' },
      { id: 'C', text: '送信先として S3 バケットを直接指定できる' },
      { id: 'D', text: 'Destinations と DLQ は同時に設定できない' }
    ],
    correct: 'B',
    explanation: 'Lambda Destinations は非同期呼び出しの結果に基づき、成功時・失敗時それぞれ別の送信先（SQS、SNS、Lambda、EventBridge）にルーティングできます。',
    point: '🔑 ポイント: Destinations は非同期呼び出し用。成功/失敗を別の宛先にルーティング可能。DLQ の上位互換として推奨される（成功時にも送信できるため）。',
    why_not: {
      'A': 'Destinations は非同期呼び出し用（とイベントソースマッピング用）。同期呼び出しには使えない。',
      'C': '送信先は SQS、SNS、Lambda、EventBridge の4種類。S3 は直接指定できない。',
      'D': 'Destinations と DLQ は同時に設定可能。ただし AWS は DLQ より Destinations の利用を推奨している。'
    }
  },
  {
    id: 'lambda-15',
    category: 'Lambda 設計パターン',
    question: 'SQS をイベントソースとして Lambda を起動する場合、メッセージ処理に失敗したときの動作として正しいものはどれか。',
    choices: [
      { id: 'A', text: '失敗したメッセージは即座に削除される' },
      { id: 'B', text: '失敗したメッセージは可視性タイムアウト後にキューに戻り、再処理される' },
      { id: 'C', text: '失敗したメッセージは自動的に DLQ に移動する（DLQ 設定不要）' },
      { id: 'D', text: '失敗したメッセージはバッチ全体とともに完全に消失する' }
    ],
    correct: 'B',
    explanation: '処理に失敗したメッセージは削除されず、可視性タイムアウト経過後にキューに戻ります。maxReceiveCount を超えると DLQ に移動します（DLQ の設定が必要）。',
    point: '🔑 ポイント: SQS + Lambda では、失敗メッセージは可視性タイムアウト後にキューに戻る。DLQ を SQS 側に設定し、maxReceiveCount で移動条件を指定する。',
    why_not: {
      'A': '失敗したメッセージは削除されず、キューに戻る。',
      'C': 'DLQ は自動設定されない。SQS キューのリドライブポリシーで明示的に DLQ を設定する必要がある。',
      'D': 'メッセージが消失することはない。キューに戻り再処理される。'
    }
  },
  {
    id: 'lambda-16',
    category: 'Lambda 設計パターン',
    question: 'Lambda の Reserved Concurrency（予約済み同時実行数）について正しいものはどれか。',
    choices: [
      { id: 'A', text: 'Reserved Concurrency を設定すると、その関数のコールドスタートが排除される' },
      { id: 'B', text: 'Reserved Concurrency は関数が使用できる同時実行数の上限を保証し、他の関数からその分を保護する' },
      { id: 'C', text: 'Reserved Concurrency は追加料金が発生する' },
      { id: 'D', text: 'Reserved Concurrency を 0 に設定しても関数は通常通り実行される' }
    ],
    correct: 'B',
    explanation: 'Reserved Concurrency は特定の関数に同時実行数を予約し、他の関数がその枠を消費しないよう保護します。追加料金は不要です。',
    point: '🔑 ポイント: Reserved Concurrency = 無料で同時実行数を予約。その関数の上限でもあり、下限の保証でもある。0に設定するとスロットリング（関数の無効化）に使える。',
    why_not: {
      'A': 'コールドスタート排除は Provisioned Concurrency の機能。Reserved Concurrency では排除されない。',
      'C': 'Reserved Concurrency に追加料金は発生しない。課金されるのは Provisioned Concurrency。',
      'D': '0 に設定すると関数は一切実行されない（スロットリングされる）。意図的に関数を無効化する手段として使える。'
    }
  },
  {
    id: 'lambda-17',
    category: 'Lambda 設計パターン',
    question: 'Lambda でべき等性（Idempotency）が重要になる理由として最も適切なものはどれか。',
    choices: [
      { id: 'A', text: 'Lambda は常に1回だけ実行されるため、べき等性は不要' },
      { id: 'B', text: '非同期呼び出しやイベントソースマッピングではリトライにより同じイベントが複数回処理される可能性がある' },
      { id: 'C', text: 'Lambda はステートフルなサービスであり、状態が蓄積されるため' },
      { id: 'D', text: 'Lambda のコールドスタート時にイベントが重複するため' }
    ],
    correct: 'B',
    explanation: 'Lambda の非同期呼び出しは最大2回リトライされ、イベントソースマッピングでもリトライが発生します。同じイベントが複数回処理される可能性があるため、べき等性の設計が重要です。',
    point: '🔑 ポイント: Lambda は「at-least-once」配信。同じイベントが複数回来ても結果が変わらない設計（べき等性）が必要。DynamoDB の条件付き書き込みやユニークキーを活用。',
    why_not: {
      'A': 'Lambda は at-least-once 配信であり、複数回実行される可能性がある。',
      'C': 'Lambda はステートレスなサービス。関数の実行環境は再利用されることはあるが、ステートフルではない。',
      'D': 'コールドスタートはイベントの重複とは無関係。リトライやイベントソースの再配信が重複の原因。'
    }
  },
  {
    id: 'lambda-18',
    category: 'Lambda 設計パターン',
    question: 'Lambda のイベントソースマッピングで DynamoDB Streams を使う場合、レコードの処理順序について正しいものはどれか。',
    choices: [
      { id: 'A', text: 'レコードの順序は保証されない' },
      { id: 'B', text: 'シャードごとにレコードの順序が保証される' },
      { id: 'C', text: 'テーブル全体でレコードの順序が保証される' },
      { id: 'D', text: '順序の保証は Lambda の設定で有効/無効を切り替えられる' }
    ],
    correct: 'B',
    explanation: 'DynamoDB Streams では、シャード（パーティションキー）ごとにレコードの順序が保証されます。Lambda はシャードごとに順番にレコードを処理します。',
    point: '🔑 ポイント: DynamoDB Streams / Kinesis はシャードレベルで順序保証。1シャードに対して同時に1つの Lambda インスタンスが処理。パラレル化ファクターで並列度を上げることも可能。',
    why_not: {
      'A': 'シャードごとに順序が保証される。',
      'C': 'テーブル全体ではなく、シャード（パーティションキー）単位での順序保証。',
      'D': '順序保証はストリームの仕様であり、Lambda 側で切り替えるものではない。'
    }
  },
  {
    id: 'lambda-19',
    category: 'Lambda 設計パターン',
    question: 'Lambda 関数内で別の Lambda 関数を同期的に呼び出す設計のデメリットとして最も適切なものはどれか。',
    choices: [
      { id: 'A', text: '技術的に不可能であり、エラーになる' },
      { id: 'B', text: '呼び出し元と呼び出し先の両方が待機するため、コストが2倍になり、エラーハンドリングも複雑になる' },
      { id: 'C', text: '呼び出し先の Lambda がコールドスタートしなくなる' },
      { id: 'D', text: '呼び出し元の Lambda のタイムアウトが自動的に延長される' }
    ],
    correct: 'B',
    explanation: 'Lambda から Lambda の同期呼び出しはアンチパターンです。呼び出し元が待機中も課金され、チェーンが深くなるとコストとレイテンシが増大し、エラーハンドリングも複雑になります。',
    point: '🔑 ポイント: Lambda → Lambda の同期呼び出しはアンチパターン。代わりに SQS、SNS、Step Functions を使って非同期連携にする。待機時間もコストになる。',
    why_not: {
      'A': '技術的には可能だが、設計上のアンチパターン。',
      'C': 'コールドスタートの有無は呼び出し方法と関係ない。',
      'D': 'タイムアウトが自動延長されることはない。むしろ呼び出し元のタイムアウト内に呼び出し先も完了する必要がある。'
    }
  },
  {
    id: 'lambda-20',
    category: 'Lambda 設計パターン',
    question: 'Lambda で Response Streaming を使用する利点として最も適切なものはどれか。',
    choices: [
      { id: 'A', text: '関数のメモリ使用量が自動的に半減する' },
      { id: 'B', text: 'クライアントがレスポンスの最初のバイトを受信するまでの時間（TTFB）を短縮できる' },
      { id: 'C', text: '関数の最大実行時間が30分に延長される' },
      { id: 'D', text: '非同期呼び出しでのみ使用でき、同期呼び出しでは使えない' }
    ],
    correct: 'B',
    explanation: 'Response Streaming を使うと、Lambda はレスポンスを段階的にクライアントへ送信できます。これにより TTFB（Time To First Byte）が短縮され、大きなレスポンスのユーザー体験が向上します。',
    point: '🔑 ポイント: Response Streaming は TTFB の短縮と大きなペイロード（最大20MB）の段階的送信に有効。Function URL で利用可能。通常の Lambda レスポンス上限（6MB）を超えられる。',
    why_not: {
      'A': 'メモリ使用量が自動的に半減することはない。',
      'C': '最大実行時間は 15分のまま変わらない。',
      'D': 'Response Streaming は Function URL 経由の同期的なリクエスト/レスポンスで使用する。'
    }
  },

  // ============================================================
  // カテゴリ3: Lambda + 他サービス連携（10問）
  // ============================================================
  {
    id: 'lambda-21',
    category: 'Lambda + 他サービス連携',
    question: 'API Gateway + Lambda 構成で、API Gateway の統合タイプとして「Lambda プロキシ統合」を選択した場合の特徴はどれか。',
    choices: [
      { id: 'A', text: 'API Gateway がリクエスト/レスポンスのマッピングテンプレートを処理する' },
      { id: 'B', text: 'API Gateway がリクエスト全体をそのまま Lambda に渡し、Lambda がレスポンス形式を制御する' },
      { id: 'C', text: 'Lambda 関数が API Gateway の設定を動的に変更できる' },
      { id: 'D', text: 'WebSocket API でのみ使用可能な統合タイプ' }
    ],
    correct: 'B',
    explanation: 'Lambda プロキシ統合では、API Gateway はリクエスト全体（ヘッダー、クエリパラメータ、ボディ等）をイベントオブジェクトとして Lambda に渡します。Lambda がステータスコード、ヘッダー、ボディを含むレスポンスを返す必要があります。',
    point: '🔑 ポイント: プロキシ統合 = リクエスト全体を Lambda に丸投げ。Lambda が statusCode/headers/body を返す。設定が簡単で最も一般的。非プロキシ統合はマッピングテンプレートでカスタマイズ可能。',
    why_not: {
      'A': 'マッピングテンプレートを使うのは「非プロキシ統合（カスタム統合）」。プロキシ統合では不要。',
      'C': 'Lambda が API Gateway の設定を動的に変更することはできない。',
      'D': 'REST API、HTTP API ともに Lambda プロキシ統合を使用可能。WebSocket 限定ではない。'
    }
  },
  {
    id: 'lambda-22',
    category: 'Lambda + 他サービス連携',
    question: 'S3 バケットにオブジェクトがアップロードされたときに Lambda を起動する場合、どの仕組みを使うか。',
    choices: [
      { id: 'A', text: 'S3 イベント通知（Event Notifications）で Lambda を指定する' },
      { id: 'B', text: 'Lambda のイベントソースマッピングに S3 を登録する' },
      { id: 'C', text: 'CloudWatch Events（EventBridge）のルールで S3 を監視する' },
      { id: 'D', text: 'Lambda が定期的に S3 をポーリングする cron を設定する' }
    ],
    correct: 'A',
    explanation: 'S3 からの Lambda 起動は、S3 バケットのイベント通知機能で Lambda を送信先として設定します。オブジェクト作成・削除などのイベントで Lambda が非同期に呼び出されます。',
    point: '🔑 ポイント: S3 → Lambda はイベント通知（プッシュ型・非同期呼び出し）。イベントソースマッピングではない。S3 から Lambda を呼ぶにはリソースベースポリシーで S3 に invoke 権限を付与する。',
    why_not: {
      'B': 'S3 はイベントソースマッピングではなくイベント通知を使う。イベントソースマッピングは SQS/Kinesis/DynamoDB Streams 等のポーリング型。',
      'C': 'EventBridge 経由でも可能だが、直接的な方法は S3 イベント通知。設問は「どの仕組みを使うか」なので最も直接的な A が正解。',
      'D': 'Lambda が S3 をポーリングする仕組みは存在しない。イベント駆動が基本。'
    }
  },
  {
    id: 'lambda-23',
    category: 'Lambda + 他サービス連携',
    question: 'DynamoDB Streams + Lambda の組み合わせで実現できるユースケースとして最も適切なものはどれか。',
    choices: [
      { id: 'A', text: 'DynamoDB テーブルのデータを定期的にバックアップする' },
      { id: 'B', text: 'テーブルへの変更をリアルタイムに検知し、別のサービスにデータを連携する' },
      { id: 'C', text: 'DynamoDB の読み取りキャパシティを自動調整する' },
      { id: 'D', text: 'DynamoDB テーブルのスキーマを動的に変更する' }
    ],
    correct: 'B',
    explanation: 'DynamoDB Streams はテーブルへの変更（INSERT/MODIFY/DELETE）をキャプチャします。Lambda と組み合わせることで、変更をリアルタイムに検知し、他サービスへの連携やデータ変換を実行できます。',
    point: '🔑 ポイント: DynamoDB Streams + Lambda は変更データキャプチャ（CDC）パターン。集計テーブルの更新、Elasticsearch への同期、SNS での通知などに活用。',
    why_not: {
      'A': '定期バックアップは DynamoDB のオンデマンドバックアップや AWS Backup で行う。Streams の用途ではない。',
      'C': '読み取りキャパシティの自動調整は Auto Scaling の役割。',
      'D': 'DynamoDB はスキーマレスであり、スキーマの動的変更という概念自体が異なる。'
    }
  },
  {
    id: 'lambda-24',
    category: 'Lambda + 他サービス連携',
    question: 'SQS FIFO キューを Lambda のイベントソースとして使用する場合の特徴として正しいものはどれか。',
    choices: [
      { id: 'A', text: 'FIFO キューでは Lambda の同時実行数に制限はない' },
      { id: 'B', text: 'メッセージグループ ID ごとに順序が保証され、同じグループのメッセージは並列処理されない' },
      { id: 'C', text: 'FIFO キューは Lambda のイベントソースとして使用できない' },
      { id: 'D', text: 'FIFO キューでは DLQ の設定ができない' }
    ],
    correct: 'B',
    explanation: 'SQS FIFO キューではメッセージグループ ID ごとに順序が保証されます。同じメッセージグループのメッセージは1つの Lambda インスタンスで順番に処理され、並列処理されません。',
    point: '🔑 ポイント: FIFO キュー + Lambda はメッセージグループ単位で順序保証。異なるメッセージグループは並列処理可能。スケーリングはメッセージグループ数に依存する。',
    why_not: {
      'A': '同時実行数はメッセージグループ数に制限される（同一グループは並列化されない）。',
      'C': 'FIFO キューは Lambda のイベントソースとして使用可能。',
      'D': 'FIFO キューでも DLQ（FIFO タイプの DLQ）を設定できる。'
    }
  },
  {
    id: 'lambda-25',
    category: 'Lambda + 他サービス連携',
    question: 'EventBridge + Lambda の組み合わせの特徴として正しいものはどれか。',
    choices: [
      { id: 'A', text: 'EventBridge はイベントソースマッピングを使って Lambda を起動する' },
      { id: 'B', text: 'EventBridge のルールに基づきイベントをフィルタリングし、Lambda を非同期で呼び出す' },
      { id: 'C', text: 'EventBridge から Lambda への呼び出しは同期的に行われる' },
      { id: 'D', text: 'EventBridge は AWS サービスのイベントのみ扱え、カスタムイベントは送信できない' }
    ],
    correct: 'B',
    explanation: 'EventBridge はイベントバスでルールに基づきイベントをフィルタリングし、ターゲット（Lambda 等）を非同期で呼び出します。AWS サービスイベント、カスタムイベント、SaaS パートナーイベントを扱えます。',
    point: '🔑 ポイント: EventBridge → Lambda は非同期呼び出し（プッシュ型）。イベントパターンでフィルタリングが可能。スケジュール（cron）による定期実行にも対応。',
    why_not: {
      'A': 'EventBridge はプッシュ型であり、イベントソースマッピング（ポーリング型）ではない。',
      'C': 'EventBridge → Lambda は非同期呼び出し。',
      'D': 'EventBridge は PutEvents API でカスタムイベントも送信できる。SaaS パートナーのイベントも対応。'
    }
  },
  {
    id: 'lambda-26',
    category: 'Lambda + 他サービス連携',
    question: 'Step Functions + Lambda で長時間の処理ワークフローを実行する場合の利点はどれか。',
    choices: [
      { id: 'A', text: 'Lambda の15分タイムアウト制限を超える処理を、複数の Lambda に分割して実行できる' },
      { id: 'B', text: 'Step Functions により Lambda の同時実行数が無制限になる' },
      { id: 'C', text: 'Step Functions が Lambda のコールドスタートを排除する' },
      { id: 'D', text: 'Step Functions を使うと Lambda の料金が無料になる' }
    ],
    correct: 'A',
    explanation: 'Step Functions は複数の Lambda 関数をステートマシンで連携でき、各 Lambda が15分以内に収まるよう処理を分割することで、全体として長時間の処理を実行できます。エラーハンドリングやリトライも宣言的に定義可能です。',
    point: '🔑 ポイント: Step Functions は Lambda の15分制限を克服する手段。並列処理、条件分岐、エラーリトライ、待機（Wait）状態を宣言的に定義。Standard ワークフローは最大1年実行可能。',
    why_not: {
      'B': 'Step Functions は Lambda の同時実行数を変更しない。アカウントの同時実行制限はそのまま適用される。',
      'C': 'コールドスタートの排除は Provisioned Concurrency の役割。Step Functions では解決しない。',
      'D': 'Step Functions にも別途料金が発生する。Lambda の料金も通常通り課金される。'
    }
  },
  {
    id: 'lambda-27',
    category: 'Lambda + 他サービス連携',
    question: 'SNS トピックから Lambda を呼び出す場合の動作として正しいものはどれか。',
    choices: [
      { id: 'A', text: 'Lambda がSNS トピックをポーリングしてメッセージを取得する' },
      { id: 'B', text: 'SNS が Lambda を非同期で呼び出し、失敗時は3回リトライする' },
      { id: 'C', text: 'SNS が Lambda を同期で呼び出し、レスポンスをサブスクライバーに返す' },
      { id: 'D', text: 'SNS と Lambda の連携には SQS キューが必ず必要' }
    ],
    correct: 'B',
    explanation: 'SNS は Lambda を非同期で呼び出します。配信に失敗した場合、SNS はリトライポリシーに基づき最大3回リトライします（内部リトライ含む）。',
    point: '🔑 ポイント: SNS → Lambda は非同期（プッシュ型）。ファンアウトパターン（1つのイベントを複数 Lambda に同時配信）に最適。SQS を挟まずに直接 Lambda を呼べる。',
    why_not: {
      'A': 'SNS はプッシュ型。Lambda がポーリングするのは SQS、Kinesis、DynamoDB Streams 等。',
      'C': 'SNS → Lambda は非同期呼び出し。同期呼び出しではない。',
      'D': 'SNS から Lambda を直接呼び出せる。SQS は必須ではない（ただし SQS を挟む構成も一般的）。'
    }
  },
  {
    id: 'lambda-28',
    category: 'Lambda + 他サービス連携',
    question: 'Kinesis Data Streams をイベントソースとして Lambda を使う場合、一度に処理するレコード数を制御するパラメータはどれか。',
    choices: [
      { id: 'A', text: 'BatchSize' },
      { id: 'B', text: 'MaximumRecordAge' },
      { id: 'C', text: 'ParallelizationFactor' },
      { id: 'D', text: 'MaximumBatchingWindow' }
    ],
    correct: 'A',
    explanation: 'BatchSize は Lambda が1回の呼び出しで処理するレコードの最大数を指定します。Kinesis のデフォルトは 100、最大 10,000 です。',
    point: '🔑 ポイント: BatchSize = 1回で処理するレコード数。MaximumBatchingWindow = バッチを溜める最大待機時間。ParallelizationFactor = シャードあたりの同時処理数。これらを組み合わせてチューニングする。',
    why_not: {
      'B': 'MaximumRecordAge はレコードの最大保持期間で、古すぎるレコードを破棄する設定。処理数の制御ではない。',
      'C': 'ParallelizationFactor は1シャードあたりの同時 Lambda インスタンス数を増やす設定。1回の処理レコード数ではない。',
      'D': 'MaximumBatchingWindow はバッチを溜める最大待機時間（秒）。レコード数の制御ではない。'
    }
  },
  {
    id: 'lambda-29',
    category: 'Lambda + 他サービス連携',
    question: 'Lambda を ALB（Application Load Balancer）のターゲットとして使用する場合の制約として正しいものはどれか。',
    choices: [
      { id: 'A', text: 'ALB からの呼び出しは非同期で行われる' },
      { id: 'B', text: 'Lambda レスポンスは ALB 固有の JSON 形式（statusCode, headers, body）で返す必要がある' },
      { id: 'C', text: 'ALB + Lambda 構成ではヘルスチェックが不要' },
      { id: 'D', text: 'ALB は Lambda 関数を複数リージョンにまたがって呼び出せる' }
    ],
    correct: 'B',
    explanation: 'ALB のターゲットとして Lambda を使う場合、Lambda は ALB が期待する JSON 形式（statusCode, statusDescription, headers, body, isBase64Encoded）でレスポンスを返す必要があります。',
    point: '🔑 ポイント: ALB + Lambda は同期呼び出し。レスポンス形式は API Gateway のプロキシ統合に類似。Multi-Value Headers をサポート。API Gateway より低コストだがスロットリング等の機能は少ない。',
    why_not: {
      'A': 'ALB → Lambda は同期呼び出し。',
      'C': 'ALB はターゲットグループのヘルスチェックを行う。Lambda の場合も設定可能。',
      'D': 'ALB は単一リージョンのリソースであり、クロスリージョン呼び出しはできない。'
    }
  },
  {
    id: 'lambda-30',
    category: 'Lambda + 他サービス連携',
    question: 'Lambda を CloudFront の Lambda@Edge として使用する場合の制約として正しいものはどれか。',
    choices: [
      { id: 'A', text: 'Lambda@Edge は任意のリージョンにデプロイできる' },
      { id: 'B', text: 'Lambda@Edge のタイムアウトはビューワーリクエスト/レスポンスで5秒、オリジンリクエスト/レスポンスで30秒' },
      { id: 'C', text: 'Lambda@Edge は環境変数を使用できる' },
      { id: 'D', text: 'Lambda@Edge は VPC 内のリソースに直接アクセスできる' }
    ],
    correct: 'B',
    explanation: 'Lambda@Edge はビューワーイベントで最大5秒、オリジンイベントで最大30秒のタイムアウト制限があります。通常の Lambda の15分より大幅に短いです。',
    point: '🔑 ポイント: Lambda@Edge は us-east-1 でデプロイし、エッジロケーションにレプリカが配布される。環境変数は使用不可。VPC アクセス不可。メモリ上限も128MB（ビューワー）/10GB（オリジン）と異なる。',
    why_not: {
      'A': 'Lambda@Edge は us-east-1（バージニア北部）でのみデプロイ可能。自動的にエッジロケーションにレプリカが配布される。',
      'C': 'Lambda@Edge では環境変数を使用できない。代わりにコード内に値を埋め込むか、外部ストアを参照する。',
      'D': 'Lambda@Edge は VPC 内のリソースに直接アクセスできない。'
    }
  },

  // ============================================================
  // カテゴリ4: Lambda パフォーマンス最適化（10問）
  // ============================================================
  {
    id: 'lambda-31',
    category: 'Lambda パフォーマンス最適化',
    question: 'Lambda のコールドスタートについて正しいものはどれか。',
    choices: [
      { id: 'A', text: 'コールドスタートは関数のコードサイズに関わらず一定時間で完了する' },
      { id: 'B', text: 'コールドスタートは新しい実行環境の作成・ランタイム初期化・ハンドラ外のコード実行を含む' },
      { id: 'C', text: 'VPC に接続している Lambda ではコールドスタートは発生しない' },
      { id: 'D', text: 'コールドスタートはすべてのリクエストで毎回発生する' }
    ],
    correct: 'B',
    explanation: 'コールドスタートは、実行環境の新規作成 → ランタイム初期化 → ハンドラ外のコード（初期化コード）の実行を含みます。その後のリクエストでは既存の実行環境が再利用（ウォームスタート）されます。',
    point: '🔑 ポイント: コールドスタートの構成 = 実行環境作成 + ランタイム初期化 + Init コード実行。ウォームスタートではハンドラのみ実行。DB接続やSDKクライアントはハンドラ外で初期化して再利用する。',
    why_not: {
      'A': 'コールドスタート時間はコードサイズ、ランタイム、VPC 設定等により大きく異なる。',
      'C': 'VPC 接続はかつてコールドスタートを悪化させたが、VPC 対応改善後も コールドスタート自体は発生する。',
      'D': 'コールドスタートは新しい実行環境が必要なときのみ発生する。既存環境が再利用可能ならウォームスタートになる。'
    }
  },
  {
    id: 'lambda-32',
    category: 'Lambda パフォーマンス最適化',
    question: 'Provisioned Concurrency の説明として正しいものはどれか。',
    choices: [
      { id: 'A', text: '関数の同時実行数の上限を設定する無料の機能' },
      { id: 'B', text: '指定した数の実行環境を事前にウォーム状態で維持し、コールドスタートを排除する有料の機能' },
      { id: 'C', text: 'Java ランタイム専用のコールドスタート最適化機能' },
      { id: 'D', text: 'Lambda 関数のメモリを自動チューニングする機能' }
    ],
    correct: 'B',
    explanation: 'Provisioned Concurrency は指定した数の実行環境を常にウォーム状態で準備しておくことで、コールドスタートを排除します。追加料金が発生します。',
    point: '🔑 ポイント: Provisioned Concurrency = 事前に実行環境を確保してコールドスタートをゼロにする。Application Auto Scaling と組み合わせてスケジュールや使用率に応じた自動スケーリングが可能。',
    why_not: {
      'A': '無料ではなく有料。同時実行数の上限設定は Reserved Concurrency（こちらは無料）。',
      'C': 'Java 専用は SnapStart。Provisioned Concurrency は全ランタイムで使用可能。',
      'D': 'メモリの自動チューニングは Lambda Power Tuning（サードパーティツール）や Compute Optimizer の役割。'
    }
  },
  {
    id: 'lambda-33',
    category: 'Lambda パフォーマンス最適化',
    question: 'Lambda SnapStart の説明として正しいものはどれか。',
    choices: [
      { id: 'A', text: 'Python ランタイム向けのコールドスタート最適化機能' },
      { id: 'B', text: 'すべてのランタイムで使用可能な汎用的なスナップショット機能' },
      { id: 'C', text: 'Java ランタイム向けの機能で、初期化済みの実行環境のスナップショットをキャッシュしてコールドスタートを高速化する' },
      { id: 'D', text: 'Lambda 関数のデプロイを高速化するための CI/CD 機能' }
    ],
    correct: 'C',
    explanation: 'SnapStart は Java ランタイム向けの機能で、初期化フェーズ完了後のメモリとディスクの状態をスナップショットとしてキャッシュします。コールドスタート時にスナップショットから復元することで起動時間を大幅に短縮します。',
    point: '🔑 ポイント: SnapStart = Java 向け。Init フェーズのスナップショットをキャッシュして復元。Provisioned Concurrency と異なり追加料金なし。ただし一意性（ユニークID等）はスナップショット復元後に再生成が必要。',
    why_not: {
      'A': 'SnapStart は Python ではなく Java ランタイム向け。',
      'B': '現時点では Java ランタイム（Corretto 11, 17, 21）のみ対応。全ランタイムではない。',
      'D': 'デプロイの高速化ではなく、コールドスタートの高速化。'
    }
  },
  {
    id: 'lambda-34',
    category: 'Lambda パフォーマンス最適化',
    question: 'Lambda のメモリ設定を増やしたときの影響として正しいものはどれか。',
    choices: [
      { id: 'A', text: 'メモリのみが増加し、CPU やネットワーク帯域は変わらない' },
      { id: 'B', text: 'メモリに比例して CPU パワーとネットワーク帯域が増加する' },
      { id: 'C', text: 'メモリを増やすと実行時間が必ず長くなる' },
      { id: 'D', text: 'メモリの変更にはLambda 関数の再デプロイが必要' }
    ],
    correct: 'B',
    explanation: 'Lambda ではメモリに比例して CPU パワーとネットワーク帯域が割り当てられます。メモリを増やすことで CPU バウンドな処理が高速化される場合があります。',
    point: '🔑 ポイント: メモリ ∝ CPU ∝ ネットワーク。1,769MB で1 vCPU 相当。CPU バウンドな処理ではメモリを増やすとコスト効率が上がることがある（実行時間短縮 > 単価上昇）。',
    why_not: {
      'A': 'メモリだけでなく CPU とネットワーク帯域も比例して増加する。',
      'C': 'メモリを増やすと CPU も増えるため、CPU バウンドな処理は実行時間が短くなることが多い。',
      'D': 'メモリ設定はコンソールや API で変更可能。コードの再デプロイは不要。'
    }
  },
  {
    id: 'lambda-35',
    category: 'Lambda パフォーマンス最適化',
    question: 'Lambda で ARM アーキテクチャ（Graviton2）を使用する利点として正しいものはどれか。',
    choices: [
      { id: 'A', text: 'x86 と比べて最大34%のコスト効率向上が期待できる' },
      { id: 'B', text: '全てのプログラミング言語とライブラリが追加の対応なしで動作する' },
      { id: 'C', text: 'ARM にすると Lambda のタイムアウト上限が30分に延長される' },
      { id: 'D', text: 'ARM ではコールドスタートが発生しない' }
    ],
    correct: 'A',
    explanation: 'Graviton2（ARM）プロセッサは x86 に比べて20%低い料金で、同等以上のパフォーマンスを提供します。AWS は最大34%のコスト効率向上を謳っています。',
    point: '🔑 ポイント: ARM (Graviton2) = 料金20%安 × パフォーマンス同等以上 = 最大34%コスト効率UP。ただし ARM 向けにコンパイルされたバイナリやネイティブライブラリが必要な場合がある。',
    why_not: {
      'B': 'ネイティブバイナリを含むライブラリ（C拡張等）は ARM 向けの再コンパイルが必要な場合がある。',
      'C': 'アーキテクチャに関わらずタイムアウト上限は15分。',
      'D': 'ARM でもコールドスタートは発生する。'
    }
  },
  {
    id: 'lambda-36',
    category: 'Lambda パフォーマンス最適化',
    question: 'Lambda のコールドスタートを短縮するためのベストプラクティスとして適切でないものはどれか。',
    choices: [
      { id: 'A', text: 'デプロイパッケージサイズを小さくする' },
      { id: 'B', text: '不要な依存関係を削除する' },
      { id: 'C', text: 'ハンドラ関数内で毎回 SDK クライアントを初期化する' },
      { id: 'D', text: 'Provisioned Concurrency を使用する' }
    ],
    correct: 'C',
    explanation: 'SDK クライアントをハンドラ内で毎回初期化するのはアンチパターンです。ハンドラ外（グローバルスコープ）で初期化し、ウォームスタート時に再利用すべきです。',
    point: '🔑 ポイント: DB接続・SDKクライアントはハンドラ外で初期化して接続を再利用する。これはコールドスタートの短縮ではなくウォームスタートの高速化に効く。コールドスタート自体の短縮にはパッケージ軽量化やProvisioned Concurrencyを使う。',
    why_not: {
      'A': 'パッケージサイズの縮小はコールドスタート短縮に有効。',
      'B': '不要な依存関係の削除はパッケージサイズ縮小と起動高速化に有効。',
      'D': 'Provisioned Concurrency はコールドスタートを排除する最も確実な方法。'
    }
  },
  {
    id: 'lambda-37',
    category: 'Lambda パフォーマンス最適化',
    question: 'Lambda で VPC 内のリソース（例: RDS）にアクセスする場合のパフォーマンス上の考慮点として正しいものはどれか。',
    choices: [
      { id: 'A', text: 'VPC 接続はコールドスタートに影響しないため、常に VPC に接続すべき' },
      { id: 'B', text: 'Hyperplane ENI により VPC 接続のコールドスタート影響は大幅に改善されたが、VPC が不要なら接続しない方がよい' },
      { id: 'C', text: 'VPC に接続すると Lambda はインターネットに直接アクセスできなくなるため、NAT Gateway が必須になる' },
      { id: 'D', text: 'B と C の両方が正しい' }
    ],
    correct: 'D',
    explanation: 'Hyperplane ENI により VPC コールドスタートは改善されましたが、不要な VPC 接続は避けるべきです。また VPC に接続した Lambda はパブリックサブネットに配置してもインターネットに直接アクセスできないため、外部 API の呼び出しには NAT Gateway（またはVPCエンドポイント）が必要です。',
    point: '🔑 ポイント: VPC Lambda はプライベートサブネットに配置し、NAT Gateway 経由でインターネットアクセス。VPC エンドポイントで AWS サービスに NAT 不要でアクセス可能。RDS Proxy を使えば接続数管理も最適化できる。',
    why_not: {
      'A': 'VPC 接続は改善されたとはいえ、不要な場合は接続しない方がよい。',
      'B': '正しいが、C も正しいため D が最も適切。',
      'C': '正しいが、B も正しいため D が最も適切。'
    }
  },
  {
    id: 'lambda-38',
    category: 'Lambda パフォーマンス最適化',
    question: 'Lambda 関数の最適なメモリサイズを見つけるためのツールとして最も適切なものはどれか。',
    choices: [
      { id: 'A', text: 'AWS Trusted Advisor' },
      { id: 'B', text: 'AWS Lambda Power Tuning' },
      { id: 'C', text: 'AWS CloudTrail' },
      { id: 'D', text: 'Amazon Inspector' }
    ],
    correct: 'B',
    explanation: 'AWS Lambda Power Tuning は Step Functions ベースのオープンソースツールで、異なるメモリ設定で関数を実行してパフォーマンスとコストの最適なバランスを見つけます。AWS Compute Optimizer でも推奨を得られます。',
    point: '🔑 ポイント: Lambda Power Tuning は Step Functions で異なるメモリ設定を自動テスト。コスト vs 実行時間のグラフを生成。AWS Compute Optimizer も Lambda のメモリ推奨を提供する。',
    why_not: {
      'A': 'Trusted Advisor はコスト最適化やセキュリティの一般的な推奨を提供するが、Lambda のメモリチューニングに特化していない。',
      'C': 'CloudTrail は API コールのログ記録サービスであり、パフォーマンスチューニングツールではない。',
      'D': 'Inspector はセキュリティ脆弱性のスキャンツール。'
    }
  },
  {
    id: 'lambda-39',
    category: 'Lambda パフォーマンス最適化',
    question: 'Lambda でイベントフィルタリングを使用する利点はどれか。',
    choices: [
      { id: 'A', text: 'Lambda 関数のメモリ使用量が減少する' },
      { id: 'B', text: '不要なイベントで Lambda が起動されなくなり、コスト削減と処理効率向上につながる' },
      { id: 'C', text: 'イベントソースのスループットが向上する' },
      { id: 'D', text: 'Lambda 関数のコールドスタートが排除される' }
    ],
    correct: 'B',
    explanation: 'イベントフィルタリングにより、イベントソースマッピングでフィルタ条件を設定し、条件に合致するイベントのみ Lambda を起動できます。不要な呼び出しを減らし、コスト削減に貢献します。',
    point: '🔑 ポイント: イベントフィルタリングは SQS、Kinesis、DynamoDB Streams 等のイベントソースマッピングで使用可能。フィルタパターンは JSON で定義し、Lambda 側でのフィルタロジックが不要になる。',
    why_not: {
      'A': 'メモリ使用量に直接影響しない。',
      'C': 'イベントソース自体のスループットには影響しない。',
      'D': 'イベントフィルタリングとコールドスタートは無関係。'
    }
  },
  {
    id: 'lambda-40',
    category: 'Lambda パフォーマンス最適化',
    question: 'Lambda 関数で RDS データベースに接続する際、接続数の問題を解決するサービスはどれか。',
    choices: [
      { id: 'A', text: 'Amazon ElastiCache' },
      { id: 'B', text: 'Amazon RDS Proxy' },
      { id: 'C', text: 'AWS Direct Connect' },
      { id: 'D', text: 'Amazon CloudFront' }
    ],
    correct: 'B',
    explanation: 'RDS Proxy は Lambda と RDS の間に配置され、データベース接続をプールして再利用します。Lambda の同時実行数が増えても、RDS への接続数を効率的に管理できます。',
    point: '🔑 ポイント: RDS Proxy = 接続プーリング。Lambda のスケールに伴う大量接続を RDS Proxy が吸収し、RDS への実接続数を制限。IAM 認証にも対応し、Secrets Manager でクレデンシャルを管理。',
    why_not: {
      'A': 'ElastiCache はキャッシュサービスであり、DB 接続数の管理は行わない。',
      'C': 'Direct Connect はオンプレミスと AWS 間の専用ネットワーク接続。DB 接続数とは無関係。',
      'D': 'CloudFront は CDN であり、DB 接続の管理は行わない。'
    }
  },

  // ============================================================
  // カテゴリ5: SAA シナリオ問題（10問）
  // ============================================================
  {
    id: 'lambda-41',
    category: 'SAA シナリオ問題',
    question: 'ECサイトで商品画像がS3にアップロードされた際、自動的にサムネイルを生成したい。最もコスト効率が良くサーバーレスなアーキテクチャはどれか。',
    choices: [
      { id: 'A', text: 'EC2 インスタンスで定期的に S3 をポーリングし、新しい画像を検出してサムネイルを生成する' },
      { id: 'B', text: 'S3 イベント通知で Lambda を起動し、Lambda がサムネイルを生成して S3 に保存する' },
      { id: 'C', text: 'ECS Fargate タスクを常時稼働させ、S3 からの通知を待ち受ける' },
      { id: 'D', text: 'CloudFront で画像変換を行う' }
    ],
    correct: 'B',
    explanation: 'S3 イベント通知 + Lambda が最もコスト効率の良いサーバーレス構成です。画像アップロード時のみ Lambda が起動し、サムネイルを生成して S3 に保存します。アイドル時のコストはゼロです。',
    point: '🔑 ポイント: イベント駆動 + サーバーレス = コスト最適。S3 → Lambda → S3 は画像変換の定番パターン。処理が15分以内に収まり、不定期のイベントに対応するケースは Lambda が最適。',
    why_not: {
      'A': 'EC2 の常時稼働はコスト効率が悪い。ポーリングもリアルタイム性に欠ける。',
      'C': 'Fargate の常時稼働は Lambda と比べてコスト効率が悪い（アイドル時間も課金される）。',
      'D': 'CloudFront 単体では画像変換機能はない。Lambda@Edge や CloudFront Functions を使えば可能だが、重い画像処理には向かない。'
    }
  },
  {
    id: 'lambda-42',
    category: 'SAA シナリオ問題',
    question: '機械学習モデルの推論処理に30分以上かかる。この処理をサーバーレスで実行するために最も適切なサービスはどれか。',
    choices: [
      { id: 'A', text: 'Lambda（タイムアウトを30分に設定）' },
      { id: 'B', text: 'AWS Fargate' },
      { id: 'C', text: 'Lambda + Step Functions で分割処理' },
      { id: 'D', text: 'Lambda のメモリを最大にして処理時間を短縮' }
    ],
    correct: 'B',
    explanation: 'Lambda のタイムアウト上限は15分であり、30分以上の処理は実行できません。AWS Fargate はサーバーレスなコンテナサービスで、長時間の処理に対応できます。',
    point: '🔑 ポイント: Lambda の15分制限を超える場合 → Fargate（サーバーレスコンテナ）が候補。処理を分割できるなら Step Functions + Lambda も可。単一処理で30分以上なら Fargate が最適。',
    why_not: {
      'A': 'Lambda のタイムアウトは最大15分であり、30分には設定できない。',
      'C': '推論処理が分割不可能な場合、Step Functions で分割しても解決しない。',
      'D': 'メモリを最大にしても15分の上限は変わらない。また、推論に30分以上かかるなら15分には収まらない。'
    }
  },
  {
    id: 'lambda-43',
    category: 'SAA シナリオ問題',
    question: 'リアルタイム決済 API で、レスポンスタイムのばらつきを最小限に抑えたい。Lambda を使用する場合、どの機能を組み合わせるべきか。',
    choices: [
      { id: 'A', text: 'Reserved Concurrency + Lambda Layers' },
      { id: 'B', text: 'Provisioned Concurrency + Application Auto Scaling' },
      { id: 'C', text: 'SnapStart + ARM アーキテクチャ' },
      { id: 'D', text: 'Function URL + Response Streaming' }
    ],
    correct: 'B',
    explanation: 'Provisioned Concurrency でコールドスタートを排除し、Application Auto Scaling で需要に応じて Provisioned Concurrency の数を自動調整します。これにより一貫したレスポンスタイムを実現できます。',
    point: '🔑 ポイント: レスポンスタイムの安定 = コールドスタート排除 = Provisioned Concurrency。Auto Scaling と組み合わせてピーク時に自動拡張・オフピーク時にコスト削減。決済など SLA が厳しい API に最適。',
    why_not: {
      'A': 'Reserved Concurrency は同時実行数の予約のみで、コールドスタートは排除しない。',
      'C': 'SnapStart は Java 専用。決済APIのランタイムが Java とは限らない。また ARM はコスト効率向上であり、レスポンス安定化の直接的な解決策ではない。',
      'D': 'Function URL と Response Streaming はコールドスタート問題を解決しない。'
    }
  },
  {
    id: 'lambda-44',
    category: 'SAA シナリオ問題',
    question: '1日1回、夜間にDynamoDBのデータを集計してレポートを生成したい。最も適切な構成はどれか。',
    choices: [
      { id: 'A', text: 'EC2 インスタンスに cron ジョブを設定する' },
      { id: 'B', text: 'EventBridge スケジュールルールで Lambda を定期実行する' },
      { id: 'C', text: 'CloudWatch アラームで Lambda を起動する' },
      { id: 'D', text: 'API Gateway のキャッシュを使ってレポートを提供する' }
    ],
    correct: 'B',
    explanation: 'EventBridge（旧 CloudWatch Events）のスケジュールルールで cron 式を指定し、Lambda を定期実行するのが最もシンプルでコスト効率が良い構成です。',
    point: '🔑 ポイント: 定期実行 = EventBridge スケジュール + Lambda。EC2 の cron と比較して、サーバー管理不要・アイドルコストゼロ。処理が15分以内に収まるかが Lambda 選択の判断基準。',
    why_not: {
      'A': 'EC2 は常時稼働のコストがかかり、1日1回の処理にはオーバースペック。',
      'C': 'CloudWatch アラームはメトリクスの閾値に基づくもので、定期実行には適さない。',
      'D': 'API Gateway のキャッシュはリクエスト時の応答を高速化するもので、定期的なレポート生成とは無関係。'
    }
  },
  {
    id: 'lambda-45',
    category: 'SAA シナリオ問題',
    question: 'マイクロサービスアーキテクチャで、注文サービスが注文完了時に在庫サービス・通知サービス・分析サービスに同時にイベントを配信したい。最も適切な構成はどれか。',
    choices: [
      { id: 'A', text: '注文サービスの Lambda から3つの Lambda を同期的に呼び出す' },
      { id: 'B', text: 'SNS トピックに注文イベントを発行し、3つの Lambda をサブスクライバーとして登録する' },
      { id: 'C', text: 'SQS キューに注文イベントを送信し、1つの Lambda で全処理を行う' },
      { id: 'D', text: 'Step Functions で3つの Lambda を順番に実行する' }
    ],
    correct: 'B',
    explanation: 'SNS のファンアウトパターンが最適です。1つの SNS トピックに対して複数のサブスクライバー（Lambda）を登録し、同時にイベントを配信できます。サービス間の疎結合を維持できます。',
    point: '🔑 ポイント: ファンアウト = SNS。1対多の非同期配信パターン。各サービスは独立して処理でき、新しいサービスの追加もトピックにサブスクライバーを追加するだけ。疎結合を維持しやすい。',
    why_not: {
      'A': 'Lambda → Lambda の同期呼び出しはアンチパターン。待機コストが3倍になり、1つの失敗が全体に影響する。',
      'C': 'SQS は1対1の配信。3つのサービスに同時配信するにはファンアウトが必要（SQS は SNS のサブスクライバーにはなれる）。',
      'D': 'Step Functions で順番に実行すると並列性がなく、全体のレイテンシが増加する（並列ステートも使えるが、SNS ファンアウトの方がシンプル）。'
    }
  },
  {
    id: 'lambda-46',
    category: 'SAA シナリオ問題',
    question: 'Lambda が VPC 内の RDS にアクセスしているが、同時にインターネット上の外部 API も呼び出す必要がある。最もコスト効率の良い構成はどれか。',
    choices: [
      { id: 'A', text: 'Lambda をパブリックサブネットに配置する' },
      { id: 'B', text: 'Lambda をプライベートサブネットに配置し、NAT Gateway を設定する' },
      { id: 'C', text: 'Lambda を VPC の外に出し、VPC Peering で RDS にアクセスする' },
      { id: 'D', text: '2つの Lambda 関数に分け、VPC 内と VPC 外にそれぞれ配置する' }
    ],
    correct: 'B',
    explanation: 'Lambda をプライベートサブネットに配置し、NAT Gateway 経由でインターネットにアクセスするのが標準的な構成です。RDS はプライベートサブネットに配置し、セキュリティを確保します。',
    point: '🔑 ポイント: VPC Lambda のインターネットアクセス = プライベートサブネット + NAT Gateway。AWS サービスへのアクセスには VPC エンドポイント（Gateway/Interface）を使うと NAT Gateway 経由より低コストな場合がある。',
    why_not: {
      'A': 'Lambda を VPC のパブリックサブネットに配置しても、Lambda にパブリック IP は割り当てられないため、インターネットにアクセスできない。',
      'C': 'Lambda を VPC 外に配置すると RDS に直接アクセスできない。VPC Peering はこの用途では使えない。',
      'D': '2つの Lambda に分けるのは不必要な複雑さを持ち込む。NAT Gateway で解決できる。'
    }
  },
  {
    id: 'lambda-47',
    category: 'SAA シナリオ問題',
    question: '大量のメッセージを処理する非同期システムで、処理の急増に対して Lambda がスロットリングされないようにしたい。最も適切な構成はどれか。',
    choices: [
      { id: 'A', text: 'Lambda の前に SQS キューを配置してバッファリングする' },
      { id: 'B', text: 'Lambda のタイムアウトを15分に設定する' },
      { id: 'C', text: 'Lambda のメモリを最大に設定する' },
      { id: 'D', text: 'Lambda@Edge を使って処理を分散する' }
    ],
    correct: 'A',
    explanation: 'SQS をバッファとして使うことで、急増するメッセージを一時的にキューに蓄積し、Lambda が処理可能なペースで順次処理できます。スロットリングを回避し、メッセージの消失も防げます。',
    point: '🔑 ポイント: SQS = バッファリング＋スロットリング対策。Lambda の同時実行数に合わせてメッセージを徐々に処理。Reserved Concurrency と組み合わせて他の関数への影響を制御可能。',
    why_not: {
      'B': 'タイムアウトを延長しても同時実行数の制限は変わらず、スロットリングは解決しない。',
      'C': 'メモリの増加は処理速度向上に役立つが、同時実行数の制限によるスロットリングは解決しない。',
      'D': 'Lambda@Edge は CloudFront のエッジ処理用であり、非同期メッセージ処理には適さない。'
    }
  },
  {
    id: 'lambda-48',
    category: 'SAA シナリオ問題',
    question: 'IoT デバイスから毎秒数千件のデータが送信され、リアルタイムに集計・分析したい。Lambda を組み込む場合の最も適切な構成はどれか。',
    choices: [
      { id: 'A', text: 'API Gateway + Lambda で各リクエストを個別処理する' },
      { id: 'B', text: 'Kinesis Data Streams + Lambda でバッチ処理する' },
      { id: 'C', text: 'SQS Standard キュー + Lambda で処理する' },
      { id: 'D', text: 'SNS + Lambda でファンアウト処理する' }
    ],
    correct: 'B',
    explanation: 'Kinesis Data Streams は大量のストリーミングデータをリアルタイムに取り込み、Lambda でバッチ処理できます。シャードで並列処理が可能で、順序保証もあります。',
    point: '🔑 ポイント: 大量リアルタイムデータ = Kinesis Data Streams + Lambda。シャード数でスループットを制御。Enhanced Fan-Out で複数コンシューマーに対応。IoT → Kinesis → Lambda → DynamoDB/S3 は定番構成。',
    why_not: {
      'A': 'API Gateway + Lambda は個別リクエスト処理向き。毎秒数千件のデータストリームにはスケーラビリティとコストの面で不適切。',
      'C': 'SQS でも処理は可能だが、リアルタイム性と順序保証の面で Kinesis が優れている。',
      'D': 'SNS はメッセージ配信（Pub/Sub）であり、大量データのストリーム処理には向かない。'
    }
  },
  {
    id: 'lambda-49',
    category: 'SAA シナリオ問題',
    question: 'ウェブアプリケーションの静的コンテンツを S3 + CloudFront で配信しているが、ユーザーのリクエストに基づいて URL のリライトやリダイレクトを行いたい。最も適切なのはどれか。',
    choices: [
      { id: 'A', text: 'Lambda 関数を別途用意して API Gateway 経由で処理する' },
      { id: 'B', text: 'CloudFront Functions を使用してエッジで軽量な URL 操作を行う' },
      { id: 'C', text: 'S3 のバケットポリシーで URL リライトを設定する' },
      { id: 'D', text: 'EC2 にリバースプロキシを配置してリダイレクトする' }
    ],
    correct: 'B',
    explanation: 'CloudFront Functions はエッジロケーションで軽量な JavaScript を実行でき、URL リライト・リダイレクト・ヘッダー操作などに最適です。Lambda@Edge より低コストで高速です。',
    point: '🔑 ポイント: 軽量なエッジ処理 = CloudFront Functions（低コスト・高速・サブミリ秒）。重い処理 = Lambda@Edge。URL リライト、ヘッダー操作、簡単な認証は CloudFront Functions で十分。',
    why_not: {
      'A': 'API Gateway + Lambda は URL リライト程度の処理にはオーバースペックで、レイテンシも増加する。',
      'C': 'S3 バケットポリシーは URL リライト機能を持たない。リダイレクトルールは限定的。',
      'D': 'EC2 リバースプロキシは管理コストが高く、サーバーレスの利点を失う。'
    }
  },
  {
    id: 'lambda-50',
    category: 'SAA シナリオ問題',
    question: '複数の AWS アカウントで共通の Lambda 関数ロジックを使いたい。コードの重複を最小限にする方法として最も適切なものはどれか。',
    choices: [
      { id: 'A', text: '各アカウントで同じコードをコピーしてデプロイする' },
      { id: 'B', text: 'Lambda Layer を作成し、リソースベースポリシーで他アカウントと共有する' },
      { id: 'C', text: '1つのアカウントの Lambda を他アカウントから直接呼び出す' },
      { id: 'D', text: 'コードを S3 に置き、各アカウントの Lambda が実行時に S3 からダウンロードする' }
    ],
    correct: 'B',
    explanation: 'Lambda Layer にはリソースベースポリシーを設定でき、特定の AWS アカウントや組織に対して Layer の使用を許可できます。共通ライブラリやロジックを Layer として共有することで、コードの重複を最小限にできます。',
    point: '🔑 ポイント: Lambda Layer はクロスアカウント共有が可能。共通ライブラリ、カスタムランタイム、ビジネスロジックの共有に活用。バージョン管理もされるため、安全にアップデートできる。',
    why_not: {
      'A': 'コードのコピーは重複管理のコストが高く、バージョン不整合のリスクがある。',
      'C': 'クロスアカウント呼び出しは可能だが、共通ロジックの「共有」ではなく、依存関係が生じる。各アカウントが独立して動作する方が望ましい。',
      'D': '実行時に S3 からダウンロードするのはレイテンシが増加し、コールドスタートが悪化する。Layer の方が効率的。'
    }
  }
];
